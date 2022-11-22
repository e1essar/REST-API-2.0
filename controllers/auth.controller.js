const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signupAdmin = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        user.setRole([1]).then(() => {
          res.status(200).send({ message: "Admin was registered successfully!" });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.createManager = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        user.setRole([2]).then(() => {
          res.status(200).send({ message: "Manager was created successfully!" });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.createCollaborator = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
        user.setRole([3]).then(() => {
          res.status(200).send({ message: "Collaborator was created successfully!" });
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      user.getRole().then(roles => {
          authorities.push("ROLE_" + roles.name.toUpperCase());
        res.status(200).send({
          id: user.id,
          username: user.username,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};