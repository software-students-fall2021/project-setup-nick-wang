const User = require("../../models/user");

module.exports = {
  signUp: async (req, res, next) => {
    // const username = req.value.body.username;
    // const password = req.value.body.password;
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({user: "Created!"});
  },

  signIn: async (req, res, next) => {
    res.send("UsersController.signIn() called!");
  },

  secret: async (req, res, next) => {
    res.send("UsersController.secret() called!");
  },
};
