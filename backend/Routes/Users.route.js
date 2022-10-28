const express = require('express');
const router = express.Router();
const multer = require('../Middleware/multer');

const authCtrl = require("../Controllers/auth.ctrl");
const userCtrl = require("../Controllers/Users.ctrl");
const auth = require('../Middleware/auth');

// Auth
router.post("/register", multer, authCtrl.register);
router.post("/login", authCtrl.login);

// Users
router.get("/users", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.delete("/user/:email", auth, userCtrl.deleteOneUser);
router.put("/update", auth, multer, userCtrl.updateProfile);
module.exports = router;