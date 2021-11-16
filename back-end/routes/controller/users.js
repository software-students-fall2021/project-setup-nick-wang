const JWT = require('jsonwebtoken');
const User = require('../../models/user');

signToken = (user) => {
  return JWT.sign(
    {
      iss: 'LifeNote',
      sub: user,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    process.env.JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    // const username = req.value.body.username;
    // const password = req.value.body.password;
    const { username, password } = req.body;

    // Check if there is a user with the same email;
    const findUser = await User.findOne({ username });
    if (findUser) {
      return res.status(403).json({ error: 'Account already exists!' });
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate token
    const token = signToken(newUser.id);

    // Respond with token
    // res.json({ user: "Created!" });
    res.status(200).json({ token });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user);
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    res.json({ secret: "resource" });
  },
};
