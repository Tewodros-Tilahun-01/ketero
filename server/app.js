const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { connectDB, mongooseConnection } = require("./config/database");
const passport = require("passport");
var routes = require("./routes");
const cors = require("cors");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://localhost:3000", // Specify your frontend domain
    credentials: true, // Enable sending cookies from the browser
  })
);

// Connect to MongoDB
connectDB();

// Set up session middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      clientPromise: Promise.resolve(mongooseConnection.getClient()), // Use the Mongoose client
      dbName: "keteroApp",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day
      secure: true,
    },
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use(routes);

port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is running on port 5000");
});
