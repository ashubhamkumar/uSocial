const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { SECRET_KEY } = require("../../utils/config.js");
// models
const User = require("../../models/User.js");
module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, phone, password } },
      context,
      info
    ) {
      //todo-- validate user,make sure doesnot already exist,hash pasword and create token
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
      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          phone: res.phone,
          username: res.username,
        },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
