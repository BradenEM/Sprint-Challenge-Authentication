const router = require("express").Router();
const Users = require("./authHelper");
const secrets = require("../config/secrets");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  let user = req.body;
  console.log(user);
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  const addedUser = await Users.add(user);

  try {
    if (addedUser) {
      if (!addedUser.username) {
        res.status(401).json({ message: "please provide username" });
      } else {
        res.status(201).json(addedUser);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;
  const user = await Users.findBy({ username }).first();

  try {
    if (user && bcrypt.compareSync(password, user.password)) {
      token = genToken(user);
      res.status(200).json({ message: `Welcome ${user.username}`, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

function genToken(user) {
  const payload = {
    subject: "user",
    username: user.username
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: "1hr"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
