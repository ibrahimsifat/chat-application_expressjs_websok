//external import
const express = require("express");

// internal import
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/user/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/user/userValidators");
const router = express.Router();

router.get("/", decorateHtmlResponse("Users"), getUsers);

router.post(
  "/",
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);
module.exports = router;
