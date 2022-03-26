const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const auth = async (req, res, next) => {
  const autheaders = req.headers.authorization;
  if (!autheaders || !autheaders.startsWith("Bearer")) {
    return res.status(StatusCodes.UNAUTHORIZED).json("unauthorized");
  }

  const token = await autheaders.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRETKEY);
    req.user = { userId: payload.userId, name: payload.name };
    console.log(req.user.userId);
    next();
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Something Wrong");
  }
};
module.exports = auth;
