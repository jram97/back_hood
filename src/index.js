const express = require("express");
const router = express.Router();
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors')

// Intializations.
const app = express();
require("./database");
app.set("trust proxy", "loopback");

// Settings
app.set("port", process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));


app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes WS
app.use(require("./routes/auth/auth"));
app.use(require("./routes/user/user"));
app.use(require("./routes/comments/comments"));
app.use(require("./routes/menu/menu"));
app.use(require("./routes/details/detail"));
app.use(require("./routes/favorite/favorite"));
app.use(require("./routes/bills/bill"));
app.use(require("./routes/directions/direction"));
app.use(require("./routes/sections/sections"));

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

// Public
app.use(express.static(path.join(__dirname, "./public")));

// Starting
app.listen(app.get("port"), () => {
  console.log("Server is in port", app.get("port"));
});