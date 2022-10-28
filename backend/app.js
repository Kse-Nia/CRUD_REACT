const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(bodyParser.json());

const router = express.Router();
app.use(express.json());
router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

const userRoutes = require("./Routes/Users.route");
const postRoutes = require("./Routes/Posts.route");
const comRoutes = require("./Routes/Comments.route");

app.use(cors());
app.use(helmet());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

sequelize
  .sync()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/home", userRoutes);
app.use("/api", postRoutes);
app.use("/api/comments", comRoutes);

module.exports = app;
