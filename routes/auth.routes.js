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
    "/api/auth/create/manager",
    [
      verifySignUp.checkDuplicateUsername,
      authJwt.verifyToken,
      authJwt.isAdmin
    ],
    controller.createManager
  );

  app.post(
    "/api/auth/create/collaborator",
    [
      verifySignUp.checkDuplicateUsername,
      authJwt.verifyToken,
      authJwt.isManager
    ],
    controller.createCollaborator
  );

  app.post("/api/auth/signin", controller.signin);
};