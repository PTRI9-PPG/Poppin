const User = require('../models/UserModel.js');
const { StatusCodes } = require('http-status-codes');

const register = async (req, res) => {
  const { email, password } = req.body;
  if(!email || !password){
    throw new Error('Email and password are required');
  }

  const userExists = await User.findOne({email});

  if(userExists){
    res.status(400);
    throw new Error('Email already in use');
  }

  const newUser = await User.create({ email, password});
  const token = newUser.createJWT();
  const user = { email: newUser.email};
  res.status(StatusCodes.CREATED).json({user, token});
};

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    res.status(500);
    throw new Error('Invalid credentials');
  }

  const isPaswordCorrect = await user.comparePasswords(password);
  if (!isPaswordCorrect) {
    res.status(500);
    throw new Error('Invalid credentials');
  }

  const token = user.createJWT();
  const userData = { email: user.email };
  res.status(StatusCodes.OK).json({ user: userData, token });
}

//Google Oauth token
const OauthLoginVerifyGoogleToken = async(req, res) => {
  const { credential } = req.body

  try{
    const ticket = await client.verifyIdToken({
    //JWT and client ID needed
    idToken: credential.token,
    audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

// Update user 
const updateUser = async (req, res) => {
  res.send('Update User');
};

// Delete user
const deleteUser = async (req, res, next) => {
  try {
    const userToDelete = await User.destroy({ id: req.params.id });
    console.log('user removed');
    res.status(200).json({ message: 'user removed' });
  } catch (err) {
    console.log(err, 'error in deleteUser');
    return next(err);
  }
}

module.exports = { register, login, OauthLoginVerifyGoogleToken, updateUser, deleteUser };
