const express = require('express');
const {
  register,
  login,
  updateUser,
  deleteUser } = require('../controllers/userController');

const router = express.Router();

router.route('/').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);
router.route('/:id').delete(deleteUser);

module.exports = router;
