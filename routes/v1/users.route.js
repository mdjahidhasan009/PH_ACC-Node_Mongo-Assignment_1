const express = require("express");
const usersControllers = require("../../controllers/users.controller");
const limiter = require("../../middleware/limiter");

const router = express.Router();

router
  .route("/save")
  .post(usersControllers.saveAUser)

router
  .route("/delete/:id")
  .delete(usersControllers.deleteAUser)

router
  .route("/all")
  .get(usersControllers.getAllUsers)

router
  .route("/random")
  .get(usersControllers.getRandomUser)

router
  .route("/update/:id")
  .post(usersControllers.updateUser);

// router
//   .route("/:id")
//   .get(viewCount, limiter, toolsControllers.getToolDetail)
//   .patch(toolsControllers.updateTool)
//   .delete(toolsControllers.deleteTool);

module.exports = router;
