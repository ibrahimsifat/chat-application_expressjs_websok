//external import
const express = require("express");

// internal import
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const router = express.Router();
const page_title = "Login";
router.get("/", decorateHtmlResponse(page_title), getLogin);
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);
router.delete("/", logout);
module.exports = router;
