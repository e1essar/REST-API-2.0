const { verifySignUp, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsername,
    ],
    controller.signupAdmin
  );

  app.post(
    "/api/auth/createmanager",
    [
      verifySignUp.checkDuplicateUsername,
      authJwt.verifyToken,
      authJwt.isAdmin
    ],
    controller.createManager
  );

  app.post(
    "/api/auth/createcollaborator",
    [
      verifySignUp.checkDuplicateUsername,
    ],
    controller.createCollaborator
  );

  app.post("/api/auth/signin", controller.signin);
};