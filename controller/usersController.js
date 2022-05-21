// external export
const bcrypt = require("bcrypt");
const { unlink } = require("fs");
const path = require("path");
const Users = require("../models/People");
// internal export
const User = require("../models/People");

// to get users page
async function getUsers(req, res, next) {
  try {
    const users = await Users.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
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

// remove user
async function removeUser(req, res, next) {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
    });

    // remove user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatar/${user.avatar}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user",
        },
      },
    });
  }
}
module.exports = { getUsers, addUser, removeUser };
