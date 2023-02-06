const { getUserByEmailModel } = require("../models/usersModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();

function passwordsMatch(req, res, next) {
  if (req.body.password !== req.body.password) {
    res.status(400).send("Passwords dont match");
    return;
  }
  next();
}

async function isNewUser(req, res, next) {
  try {
      const user = await getUserByEmailModel(req.body.email);
      if (user) {
          res.status(400).send("User already exists");
          return;
      }
      next();
  } catch (err) {
      console.log(err);
  }
}

function hashPwd(req, res, next) {
  const saltRounds = 10;
  bcrypt.hash(req.body.password,  saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    req.body.password = hash;
    next();
  });
}

async function isExistingUser(req, res, next) {
  const user = await getUserByEmailModel(req.body.email);
  if (user) {
    req.body.user = user;
    next();
    return;
  }
  res.status(400).send("User with this email does not exist");
}


async function verifyPwd(req, res, next) {
  const { user } = req.body;

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (result) {
      next();
      return;
    } else {
      res.status(400).send("Incorrrect Password!");
    }
  });
}

async function auth(req, res, next) {
  if (!req.headers.authorization) {
    
    res.status(401).send("Authorization headers required");
    return;
  }
  const token = req.headers.authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).send("Unauthorized");
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id
      next();
      return;
    }
  });
}

module.exports = { passwordsMatch, isExistingUser, isNewUser, hashPwd, verifyPwd};
