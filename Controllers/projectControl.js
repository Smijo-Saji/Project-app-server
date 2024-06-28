const projects = require("../Models/projectmodel");
const users = require("../Models/usermodel");

exports.addProject = async (req, res) => {
  const { title, description, technologies, website, gitHub } = req.body;
  //acces imgurl from multer
  const coverImg = req.file?.filename;

  // access userId from request.payload bcz this logic contain  jwtmiddleware
  const userId = req.payload;

  try {
    const existingProject = await projects.findOne({ gitHub });
    if (existingProject) {
      res.status(400).json(`${existingProject.title} is already exist!`);
    } else {
      const newProject = new projects({
        title,
        description,
        technologies,
        website,
        gitHub,
        userId,
        coverImg,
      });
      newProject.save();
      res.status(201).json(newProject);
    }
  } catch {
    res.status(400).json("Adding Project Api Failed");
  }
};

exports.getHomeProjects = async (req, res) => {
  try {
    const homeprojects = await projects.find().limit(3);
    if (homeprojects) {
      res.status(200).json(homeprojects);
    }
  } catch {
    res.status(400).json("Getting Home Project Api Failed");
  }
};

exports.getAllProjects = async (req, res) => {
  //to acces query param
  const searchData = req.query.search; //use same variable name that we use to send query params

  try {
    const homeprojects = await projects.find({
      technologies: { $regex: searchData, $options: "i" },
    }); // $options: "i" to make it case insensitive
    if (homeprojects) {
      res.status(200).json(homeprojects);
    }
  } catch {
    res.status(400).json("Getting Home Project Api Failed");
  }
};

exports.getUserProjects = async (req, res) => {
  const userId = req.payload;
  try {
    const userProjects = await projects.find({ userId });
    if (userProjects) {
      res.status(200).json(userProjects);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

//edit project

exports.editProjectApi = async (req, res) => {
  const { _id } = req.params;
  const { title, description, technologies, website, gitHub, coverImg } =
    req.body;
  const newCoverImg = req.file ? req.file.filename : coverImg;
  const userId = req.payload;
  //while using this update we need to inckude all keys in model
  const updatedProject = await projects.findByIdAndUpdate(
    { _id },
    {
      title,
      description,
      technologies,
      coverImg: newCoverImg,
      website,
      gitHub,
      userId,
    },
    { new: true }
  );

  await updatedProject.save();
  res.status(200).json(updatedProject);
};

exports.deletePorject = async (req, res) => {
  const { _id } = req.params;
  try {
    const deletedProject = await projects.findByIdAndDelete({ _id });
    //no need to perform save operation for delete
    res.status(200).json(deletedProject);
  } catch (err) {
    res.status(400).json(err);
  }
};
