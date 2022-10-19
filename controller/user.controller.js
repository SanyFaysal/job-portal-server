const {
  signupService,
  findUserByEmailService,
} = require('../service/user.service');
const { generateToken } = require('../utils/token');

exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const result = await signupService(data);

    res.status(200).json({
      status: 'Success',
      message: 'Signup successful',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.findUserByEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: 'failed',
        error: 'Please give your credentials',
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(401).json({
        status: 'failed',
        error: 'No result found with this email',
      });
    }

    const isValidPassword = user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        status: 'failed',
        error: 'Password not matched',
      });
    }
    if (user.status !== 'active') {
      return res.status(401).json({
        status: 'failed',
        error: 'you are not active yet',
      });
    }
    const token = generateToken(user);

    res.status(200).json({
      status: 'Success',
      message: 'Successfully logged in',
      data: user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
