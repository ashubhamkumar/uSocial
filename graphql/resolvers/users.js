const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { SECRET_KEY } = require("../../utils/config.js");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validator.js");
// models
const User = require("../../models/User.js");

//gentrate token
function genrateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      phone: user.phone,
      username: user.username,
    },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}

module.exports = {
  Mutation: {
    // login user
    async login(_, { phone, password }) {
      try {
        const { errors, valid } = validateLoginInput(phone, password);
        if (!valid) {
          throw new UserInputError("Error", { errors });
        }
        const existingUser = await User.findOne({ phone });
        if (!existingUser) {
          errors.genral = "User Not Found!";
          throw new UserInputError("User Not Found!", { errors });
        }
        const matchPswd = await bcrypt.compare(password, existingUser.password);
        if (!matchPswd) {
          errors.genral = "Wrong Crendetails!";
          throw new UserInputError("Wrong Crendetails!", { errors });
        }

        const token = genrateToken(existingUser);
        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    // register new user
    async register(
      _,
      { registerInput: { username, email, phone, password } },
      context,
      info
    ) {
      try {
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          phone,
          password
        );
        if (!valid) {
          throw new UserInputError("Error", { errors });
        }

        const existingUser = await User.findOne({ phone });
        if (existingUser) {
          throw new UserInputError("User already exists!", {
            errors: {
              phone: "User already exists!",
            },
          });
        }
        password = await bcrypt.hash(password, 12);
        const newUser = new User({
          email,
          phone,
          username,
          password,
          createdAt: new Date().toISOString(),
        });
        const res = await newUser.save();
        const token = genrateToken(res);
        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
