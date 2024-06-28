const express = require("express");
const { register, login, editProfile } = require("../Controllers/userControl");
const upload = require("../middlewares/multermiddleware");
const {
  addProject,
  getHomeProjects,
  getAllProjects,
  getUserProjects,
  editProjecrApi,
  deletePorject,
  editProjectApi,
} = require("../Controllers/projectControl");
const { jwtMiddleware } = require("../middlewares/jwtmiddleware");

//create an object for router
const router = new express.Router();

//register
router.post("/user/register", register);

//login
router.post("/user/login", login);

//adproject add router-specific middleware
router.post(
  "/user/add-project",
  jwtMiddleware,
  upload.single("coverImg"),
  addProject
);

//get random 3 projects for home page
router.get("/home-projects", getHomeProjects);

//get all projects

router.get("/explore-projects", getAllProjects);

//get prpojects for specific user
router.get("/user-projects", jwtMiddleware, getUserProjects);

//edit project
router.put(
  "/user/edit-project/:_id",
  jwtMiddleware,
  upload.single("coverImg"),
  editProjectApi
);

//delete projects
router.delete("/user/delete-project/:_id", jwtMiddleware, deletePorject);

//edit ptofile
router.put(
  "/user/edit-profile/:_id",
  jwtMiddleware,
  upload.single("profile"),
  editProfile
);

module.exports = router;
