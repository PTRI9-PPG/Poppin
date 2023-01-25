const express = require('express');
const { 
    businessRegister, 
    loginBusiness, 
    updateBusiness, 
    checkDealCode, 
    deleteBusiness } = require('../controllers/businessController');

const router = express.Router();

router.route('/').post(businessRegister);
router.route('/login').post(loginBusiness);
router.route('/:id').patch(updateBusiness);
router.route('/checkin/:id').post(checkDealCode);
router.route('/:id').delete(deleteBusiness);

module.exports = router;
