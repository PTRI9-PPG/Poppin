const express = require('express');
const {
  businessRegister,
  getAllBusinesses,
  initialRegisterBusiness,
  registerBusiness,
  loginBusiness,
  updateBusiness,
  checkDealCode,
  deleteBusiness,
} = require('../controllers/businessController');

const router = express.Router();

router.get('/', getAllBusinesses);
router.post('/login', loginBusiness);
router.post('/', initialRegisterBusiness);
router.post('/register', registerBusiness);
router.put('/:id', updateBusiness);
router.post('/checkin/:id', checkDealCode);
router.delete('/:id', deleteBusiness);

module.exports = router;
