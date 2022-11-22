const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

var corsOptions = {
  origin: "http://localhost:8081"
};

const app = express();

app.use(
  '/api-docs',
  swaggerUI.serve, 
  swaggerUI.setup(swaggerDocument)
);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

function initial() {
  Role.create({
    id: 1,
    name: "admin"
  });

  Role.create({
    id: 2,
    name: "manager"
  });

  Role.create({
    id: 3,
    name: "collaborator"
  });
}

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// check route
app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

// set port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});