// external export
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");

// internal export
const User = require("../models/People");

// to get users page
function getUsers(req, res) {
  res.render("users");
}

// add user
async function addUser(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user on send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      massage: "user was added successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: {
        common: {
          msg: "unknown error occured!",
        },
      },
    });
  }
}
module.exports = { getUsers, addUser };
