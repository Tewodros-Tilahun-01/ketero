const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const User = require("../models/user");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;
const Schedule = require("../models/Schedule");
const sendEmail = require("../config/mail");
/**
 * -------------- POST ROUTES ----------------
 */

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.json({
        userAuthenticated: false,
      });
    }
    if (!user) {
      return res.json({
        userAuthenticated: false,
      }); // User not found or invalid
    }

    // Log in the user and create a session
    req.login(user, (err) => {
      if (err) {
        return res.json({
          userAuthenticated: false,
        });
      }

      return res.json({ userAuthenticated: true, role: user.role });
    });
  })(req, res, next);
});

router.post("/signup", (req, res, next) => {
  const isUserFound = async () => {
    try {
      const userExists = await User.findOne({
        $or: [
          { username: req.body.username.toLowerCase() },
          { email: req.body.email.toLowerCase() },
          { phone: req.body.phone },
        ],
      });

      if (!userExists) {
        const saltHash = genPassword(req.body.password);
        const salt = saltHash.salt;
        const hash = saltHash.hash;

        const newUser = new User({
          firstName: req.body.firstName.toLowerCase(),
          lastName: req.body.lastName.toLowerCase(),
          username: req.body.username.toLowerCase(),
          hash: hash,
          salt: salt,
          city: req.body.city,
          phone: req.body.phone,
          email: req.body.email.toLowerCase(),
          role: req.body.role,
          admin: false,
          availability: [],
        });

        newUser.save().then((user) => {});
        res.send({ userAuthenticated: true });
      } else {
        res.send({
          userAuthenticated: false,
          message: "already has account",
        });
      }
    } catch (error) {
      res.send({ userAuthenticated: false });
    }
  };

  isUserFound();
});

router.post("/api/:officerId/Schedule", async (req, res, next) => {
  const { officerId } = req.params;

  try {
    const { eventName, duration, location, date } = req.body;

    const user = await User.findOne(
      { _id: officerId, "availability.day": date },
      { "availability.$": 1 }
    );
    let updatedTime = 0;
    if (user && user.availability.length > 0) {
      const oldTime = Number(user.availability[0].time);
      updatedTime = oldTime - Number(duration);
    }
    const officer = await User.findByIdAndUpdate(officerId, {
      new: true,
    });
    if (updatedTime >= 0) {
      let ews = await User.findOneAndUpdate(
        { _id: officerId, "availability.day": date },
        { $set: { "availability.$.time": updatedTime } } // Update `time` for the matched `day`
      );

      const newSchedule = new Schedule({
        officerId: officerId,
        customerId: req.user.id,
        eventName: eventName,
        duration: Number(duration),
        location: location,
        date: date,
      });
      newSchedule.save();
      // sendEmail(
      //   officer.email,
      //   "Your Appointment is Scheduled!",
      //   `Hello ${officer.firstName} ${officer.lastName}, \n\nWe are pleased to inform you that your appointment has been successfully scheduled.\n\nAppointment Details: \n Date: ${date} \n duration: ${duration} \n location: ${location} \n\nIf you need to make any changes, feel free to contact us at ketero321@gmail.com \n\nThank you for choosing us, and we look forward to seeing you! \n\nBest regards, \nketero \nketero321@gmail.com`
      // );
      res.send({ states: true });
    } else {
      res.send({ states: false, message: "does not have that much time" });
    }
  } catch (error) {
    res.send({ states: false });
  }
});

router.get("/api/schedule", async (req, res) => {
  try {
    if (req.user) {
      const schedule = await Schedule.find({
        $or: [{ officerId: req.user.id }, { customerId: req.user.id }],
      });
      return res.json(schedule);
    }
  } catch (error) {
    return res.json({ error: "Failed to get data" });
  }

  return res.send({});
});

router.delete("/api/schedule/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user) {
      const schedule = await Schedule.findById(id);

      const officer = await User.findById(schedule.officerId);
      const customer = await User.findByIdAndUpdate(schedule.customerId);

      const user = await User.findOne(
        { _id: schedule.officerId, "availability.day": schedule.date },
        { "availability.$": 1 }
      );

      if (user) {
        const updateTime =
          Number(schedule.duration) + Number(user.availability[0].time);
        await User.findOneAndUpdate(
          { _id: schedule.officerId, "availability.day": schedule.date },
          { $set: { "availability.$.time": updateTime } }
        );
      }

      const deletedSchedule = await Schedule.findByIdAndDelete(id);

      // sendEmail(
      //   officer.email,
      //   "Your Appointment has been Canceled",
      //   `Hello ${officer.firstName} ${officer.lastName} \n\n\nWe regret to inform you that your upcoming appointment scheduled for ${deletedSchedule.date} has been canceled. We apologize for any inconvenience this may cause and appreciate your understanding. \n\n If you would like to reschedule, please contact us at ketero321@gmail.com or visit our scheduling page at ketero.com. \n\n\n Thank you for your patience, and we look forward to assisting you. \n\n\n Sincerely, \n ketero \n ketero321@gmail.com`
      // );
      // sendEmail(
      //   customer.email,
      //   "Your Appointment has been Canceled",
      //   `Hello ${customer.firstName} ${customer.lastName} \n\n\nWe regret to inform you that your upcoming appointment scheduled for ${deletedSchedule.date} has been canceled. We apologize for any inconvenience this may cause and appreciate your understanding. \n\n If you would like to reschedule, please contact us at ketero321@gmail.com or visit our scheduling page at ketero.com. \n\n\n Thank you for your patience, and we look forward to assisting you. \n\n\n Sincerely, \n ketero \n ketero321@gmail.com`
      // );

      const newSchedule = await Schedule.find({
        $or: [{ officerId: req.user.id }, { customerId: req.user.id }],
      });
      return res.json(newSchedule);
    }
  } catch (error) {
    return res.json({ error: "Failed  to delete " });
  }

  return res.send({});
});
router.get("/api/officerDate/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user) {
      const dates = await User.findById(id, {
        availability: 1,
        _id: 0,
      });

      return res.json(dates);
    }
  } catch (error) {
    return res.json({ error: "Failed to delete date" });
  }

  return res.send({});
});
router.get("/api/officers", (req, res, next) => {
  const findUser = async () => {
    const response = await User.find(
      { role: "officer" },
      {
        hash: 0,
        salt: 0,
        __v: 0,
        admin: 0,
        role: 0,
        phone: 0,
        email: 0,
        phone: 0,
      }
    );
    let officerHasTime = response.filter((officer) => {
      return officer.availability.length > 0;
    });
    res.send(officerHasTime);
  };
  if (req.user) {
    findUser();
  } else {
    res.send({});
  }
});

router.get("/user", (req, res, next) => {
  const findUser = async () => {
    const response = await User.findById(req.user.id, {
      hash: 0,
      salt: 0,
      availability: 0,
    });
    res.send(response);
  };
  if (req.user) {
    findUser();
  } else {
    res.send({});
  }
});
router.get("/admin-route", isAdmin, (req, res, next) => {
  res.send("You made it to the admin route.");
});

router.get("/isauth", isAuth, (req, res, next) => {
  res.json({ userAuthenticated: true, role: req.user.role });
});
router.delete("/api/dates/:date", async (req, res) => {
  const { date } = req.params;
  try {
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { availability: { day: date } },
        new: true,
      });

      const updatedDate = await User.findById(req.user.id, {
        availability: 1,
        _id: 0,
      });

      return res.json(updatedDate);
    }
  } catch (error) {
    return res.json({ error: "Failed to delete date" });
  }

  return res.send({});
});

router.post("/api/dates", async (req, res) => {
  const { date } = req.body;
  const { time } = req.body;

  try {
    if (req.user) {
      const user = await User.findOne({
        _id: req.user.id,
        "availability.day": date,
      });
      if (!user) {
        await User.findByIdAndUpdate(
          req.user.id,
          {
            $addToSet: { availability: { day: date, time: Number(time) } },
          },
          { new: true }
        );
      } else {
        await User.findOneAndUpdate(
          { _id: req.user.id, "availability.day": date },
          { $set: { "availability.$.time": time } },
          { new: true }
        );
      }
      const updatedDate = await User.findById(req.user.id, {
        availability: 1,
        _id: 0,
      });
      return res.json(updatedDate);
    }
  } catch (error) {
    return res.json({ error: "Failed to delete date" });
  }

  return res.send({});
});

router.get("/api/dates", async (req, res) => {
  try {
    if (req.user) {
      const dates = await User.findById(req.user.id, {
        availability: 1,
        _id: 0,
      });
      return res.json(dates);
    }
  } catch (error) {
    return res.json({ error: "Failed to delete date" });
  }

  return res.send({});
});

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });

  res.clearCookie("connect.sid");
  res.send({ userAuthenticated: false });
});

module.exports = router;
