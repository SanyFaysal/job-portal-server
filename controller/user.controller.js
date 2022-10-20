const {
  signupService,
  findUserByEmailService,
  getUsersService,
  getUserDetailsByIdService,
  updateCandidateRoleService,
} = require('../service/user.service');
const { generateToken } = require('../utils/token');

exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const result = await signupService(data);
    const token = generateToken(result);
    res.status(200).json({
      status: 'Success',
      message: 'Signup successful',
      token,
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
    const { password: pwd, ...other } = user.toObject();
    res.status(200).json({
      status: 'Success',
      message: 'Successfully logged in',
      data: other,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};

exports.getMe = async (req, res) => {
  try {
    const { email } = req.user;
    const result = await findUserByEmailService(email);
    if (!result) {
      return res.status(400).json({
        status: 'failed',
        message: 'Token is not verified',
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'successfully get data',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await getUsersService(role);
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get all the data',
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};

exports.getUserDetailsById = async (req, res) => {
  try {
    const { role, id } = req.params;
    const userDetails = await getUserDetailsByIdService(role, id);
    if (!userDetails) {
      return res.status(400).json({
        status: 'failed',
        message: `Couldn\'t find any ${role} with this id`,
      });
    }
    console.log(role, id);
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get all the data',
      data: userDetails,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
exports.updateCandidateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await updateCandidateRoleService(id);
    console.log(update);
    if (!update.modifiedCount) {
      return res.status(400).json({
        status: 'failed',
        message: `Couldn\'t find any ${role} with this id`,
      });
    }
    res.status(200).json({
      status: 'Success',
      message: 'Successfully get all the data',
      data: update,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      error: error.message,
    });
  }
};
