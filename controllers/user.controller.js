
const db = require("../models");

exports.getUsers = async (req, res) => {
  const users = await db.sequelize.query("SELECT * FROM users", {type: db.sequelize.QueryTypes.SELECT})
  return res.status(200).json(users)
};

exports.getUser = async (req, res) => {
  const id = req.params.id
  const user = await db.sequelize.query("SELECT * FROM users WHERE id = (:id)", {
    replacements: {
      id: req.params.id
    }, 
    type: db.sequelize.QueryTypes.SELECT})
    return res.status(200).json(user)
}

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};