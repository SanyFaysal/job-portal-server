const express = require('express');
const userController = require('../controller/user.controller');
const { authorization } = require('../middleware/authorizaiton');
const { verifyToken } = require('../middleware/verifyToken');
const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.findUserByEmail);
router.get('/me', verifyToken, userController.getMe);

router
  .route('/candidate/:id')
  .patch(
    verifyToken,
    authorization('admin'),
    userController.updateCandidateRole
  );

router.route('/:role/:id').get(userController.getUserDetailsById);

router.route('/:role').get(userController.getUsers);

module.exports = router;
