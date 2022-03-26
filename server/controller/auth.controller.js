const User = require("../model/auth");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  const bodyObject = {
    name: name,
    email: email,
    password: password,
  };
  try {
    if (!name) {
      return res.status(StatusCodes.BAD_REQUEST).json("Name Field is Required");
    }
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Email Field is Required");
    }
    if (!password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Password Field is Required");
    }
    if (!confirmpassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Confirm Password Field is Required");
    }

    if (password !== confirmpassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("confirm password must be same in password");
    }

    const emailcheck = await User.findOne({ email: email });
    if (emailcheck) {
      return res.status(StatusCodes.BAD_REQUEST).json({msg:"Email Already exist"});
    }
    const user = await User.create(bodyObject);

    const token = user.createJwt();

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("something wrong");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Email field is Required");
    }
    if (!password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json("Password field is Required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json("User Not Found");
    }

    const passwordresponse = await user.comparePassword(password);
    if (!passwordresponse) {
      return res.status(StatusCodes.BAD_REQUEST).json("Password is incorrect");
    }
    const token = user.createJwt();
    res
      .status(StatusCodes.OK)
      .json({ user: { name: user.name }, token });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json("Something Wrong");
  }
};
module.exports = { register, login };
