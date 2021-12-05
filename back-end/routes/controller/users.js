const JWT = require('jsonwebtoken');
const User = require('../../models/user');
const Summary = require('../../models/summary');


signToken = (user) => {
  return JWT.sign(
    {
      iss: 'LifeNote',
      sub: user,
      iat: new Date().getTime(),
      // exp: new Date().setDate(new Date().getDate() + 3),
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
      return res.status(403).json('Account already exists!');
    }

    // Create a new user
    const newUser = new User({ username, password });
    await newUser.save();

    // Generate token
    const token = signToken(newUser.id);

    // Create new summary data
    const initalLimit = 1000;
    const newSummary = new Summary ({
      userID: newUser.id,
      username: username,
      monthlyLimit: initalLimit
    });
    
    await newSummary.save().then();

    // Respond with token
    // res.json({ user: "Created!" });

    res.status(200).json({ token });

    // const checkreq = req.body;
    // res.status(200).json({ checkreq });
  },

  signIn: async (req, res, next) => {
    // Generate token
    const token = signToken(req.user.id);
    // console.log(req.user.id)
    res.status(200).json({ token });
  },

  secret: async (req, res, next) => {
    res.json({ username: req.user.username, user_id: req.user.id });
  },
};
