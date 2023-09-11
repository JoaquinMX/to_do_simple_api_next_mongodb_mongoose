const express = require('express');
const router = express.Router();
const { requireLogin } = require('../middlewares/authentication');

// We use the corresponding controller here to handle the product resource
// Now the routes are simply doing that: re-rerouting the request (including all of their context) to the corresponding controller.
const UserController = require('../controllers/user');

// Login User
router.post("/login", UserController.login);
// Get User By JWT
router.get("/profile", requireLogin, UserController.getUserByJwt);
// Get User By Email
router.get("/userByEmail/:email", requireLogin, UserController.getUserByEmail);

// Register User
router.post("/", UserController.registerUser);

// Get All Users
router.get("/", requireLogin, UserController.getAllUsers);

module.exports = router;