const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { connectDB, mongooseConnection } = require("./config/database");
const passport = require("passport");
var routes = require("./routes");

require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
      autoRemove: "native",
    },
  })
);

require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

app.use(routes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
