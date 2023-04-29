const jwt = require("jsonwebtoken");


const verifyToken = (req, res) => {
  const token = req.cookies.token;// || req.headers["x-access-token"];
  console.log("cookies: ",req.cookies);
  console.log(req.path);
  if (!token) {
    res.status(403).send("A token is required for authentication");
    return false;
  }
  try {
    const decoded = jwt.verify(token, "some_secret_key");
    req.user = decoded;
  } catch (err) {
    res.status(401).send("Invalid Token");
    return false;
  }
  return true;
};

module.exports = {
  verifyToken
}