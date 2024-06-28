//register logic
const JWT = require("jsonwebtoken");
const users = require("../Models/usermodel");

exports.register = async (req, res) => {
  //fetch body details
  var { username, email, password } = req.body;
  try {
    if (await users.findOne({ email })) {
      //if user already registered check email in model
      res.status(401).json("User Already Registere Please Login");
    } // user not registered already
    else {
      //to add a new user in node we dont want to use inertOne insted create an object of users model
      const newUser = new users({
        username,
        email,
        password,
        profile: "",
        linkedIn: "",
        gitHub: "",
      });
      await newUser.save();
      res.status(201).json("Account Created Successfully");
    }
  } catch {
    res.status(400).json("Register Api Failed");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email, password });
    if (user) {
      //token generation for authorization
      const token = JWT.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.status(200).json({
        user,
        message: "User Login Success",
        token,
      });
    } else {
      res.status(401).json("Invalid Username or password");
    }
  } catch (error) {
    res.status(400).json("Login Api Failed");
  }
};

exports.editProfile = async (req, res) => {
  const { username, linkedIn, gitHub, profile } = req.body;
  const _id = req.params;
  const newProfile = req.file ? req.file.filename : profile;

  const user = await users.findOne({ _id });

  //while using this update method we dont want to specify every keys in model
  if (user) {
    (user.username = username),
      (user.linkedIn = linkedIn),
      (user.gitHub = gitHub),
      (user.profile = newProfile);
    await user.save();
    res.status(200).json(user);
  }
};
