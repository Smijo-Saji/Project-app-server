const jwt = require("jsonwebtoken");

exports.jwtMiddleware = (req, res, next) => {
  console.log("__________JWT Middleware___________");

  try {
    //access token from req  general convention of token sending us "Bearer token" so we need to avoid Bearer while accessing
    let token = req.headers["access_token"].split(" ")[1];

    //verify token
    const jwtResponse = jwt.verify(token, process.env.SECRET_KEY);

    //acccess payload and store
    req.payload = jwtResponse.userId;

    //exit from middleware function and countinue
    next();
  } catch {
    res.status(401).json("Authentication Failed ! Please Login");
  }
};
