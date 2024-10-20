const router = require("express").Router();
const passport = require("passport");
const genPassword = require("../lib/passwordUtils").genPassword;
const User = require("../models/user");
const isAuth = require("./authMiddleware").isAuth;
const isAdmin = require("./authMiddleware").isAdmin;

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

      return res.json({ userAuthenticated: true });
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
          age: req.body.age,
          city: req.body.city,
          phone: req.body.phone,
          email: req.body.email.toLowerCase(),
          role: req.body.role,
          admin: true,
          availability: [],
        });

        newUser.save().then((user) => {
          // console.log(user);
        });
        res.send({ userAuthenticated: true });
      } else {
        res.send({ userAuthenticated: false });
      }
    } catch (error) {
      res.send({ userAuthenticated: false });
    }
  };

  isUserFound();
});

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You made it to the route.");
});

router.get("/admin-route", isAdmin, (req, res, next) => {
  res.send("You made it to the admin route.");
});

router.delete("/api/dates/:date", async (req, res) => {
  const { date } = req.params;
  try {
    if (req.user) {
      console.log(date);
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { availability: date },
        new: true,
      });

      const updatedDate = await User.findById(req.user.id, {
        availability: 1,
        _id: 0,
      });
      console.log(updatedDate);
      return res.json(updatedDate);
    }
  } catch (error) {
    return res.json({ error: "Failed to delete date" });
  }

  return res.send({});
});

router.post("/api/dates/:date", async (req, res) => {
  const { date } = req.params;
  try {
    if (req.user) {
      console.log(date);
      await User.findByIdAndUpdate(req.user.id, {
        $push: { availability: date },
        new: true,
      });

      const updatedDate = await User.findById(req.user.id, {
        availability: 1,
        _id: 0,
      });
      console.log(updatedDate);
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
router.get("/logout", function (req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.send({ userAuthenticated: false });
  });
});

module.exports = router;
