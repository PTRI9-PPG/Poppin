const Business = require('../models/BusinessModel.js');
const { StatusCodes } = require('http-status-codes');

const { Client } = require('@googlemaps/google-maps-services-js');
const generatedCodes = require('../seeders/generatedCodes');
const getPoppinScore = require('../utils/getPoppinScore');

const businessRegister = async (req, res) => {
  const {
    username,
    businessname,
    password,
    email,
    location,
    poppinscore,
    maxcapacity,
    currentcapacity,
    image,
    phonenumber,
    incentive,
  } = req.body;

  let { latitude, longitude } = req.body;

  if (!username || !businessname || !password || !email || !location) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  const businessExists = await Business.findOne({ email });
  if(businessExists){
    res.status(400);
    throw new Error('Business already exists');
  }

  const newBusiness = await Business.create({
    username, 
    businessname, 
    email, 
    password, 
    location,
    poppinscore,
    maxcapacity,
    currentcapacity,
    latitude,
    longitude,
    image,
    phonenumber,
    incentive,
    currentcode: 'felix',
    codestouse: generatedCodes,
    storedcodes: [],
  });
  const token = newBusiness.createJWT();
  const business = { 
    username: newBusiness.username, 
    businessname: newBusiness.businessname, 
    email: newBusiness.email, 
    location: newBusiness.location,
    poppinscore: newBusiness.poppinscore,
    maxcapacity: newBusiness.maxcapacity,
    currentcapacity: newBusiness.currentcapacity,
    phonenumber: newBusiness.phonenumber,
    incentive: newBusiness.incentive,
    currentcode: 'felix',
    codestouse: generatedCodes,
    storedcodes: [],
  };
  res.status(StatusCodes.CREATED).json({business, token});

  const geocodingClient = new Client({});
  let params = {
    address: location,
    key: 'AIzaSyDzT6YYS0tMZIKZCDuv5L566AY5rlZlzpU',
  };

  await geocodingClient
    .geocode({ params })
    .then((response) => {
      let { lat, lng } = response.data.results[0].geometry.location;
      latitude = lat;
      longitude = lng;
    }).catch((error) => console.log(error));
};

//Login to Business
const loginBusiness = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error('Email and password are required');
  }

  const businessExists = await Business.findOne({ email });

  if (!businessExists) {
    res.status(500);
    throw new Error('Email and password combination is invalid');
  }
  console.log('EMAIL WAS FOUND!');

  const newBusiness = await Business.create({email, password});
  const token = newBusiness.createJWT();
  const business = { email: newBusiness.email};
  res.status(StatusCodes.CREATED).json({business, token});
};

//Update Business
const updateBusiness = async (req, res, next) => {
  const { currentcapacity, maxcapacity } = req.body;

  const poppinPercentage = (currentcapacity / maxcapacity) * 100;
  let newPoppinScore = getPoppinScore(poppinPercentage);

  try{
    const business = await Business.findOne({id: req.params.id});
    if (!business) {
      res.status(400);
      throw new Error('Business not found');
    }
    if (business.currentcapacity > business.maxcapacity) {
      res.status(400);
      throw new Error('Business is fully booked');
    }

    const poppinPercentage = (business.currentcapacity / business.maxcapacity) * 100;
    let newPoppinScore = getPoppinScore(poppinPercentage);

    await business.set({
      poppinscore: parseInt(newPoppinScore),
      currentcapacity: parseInt(business.currentcapacity) + 1,
      maxcapacity: parseInt(business.maxcapacity),
    });
    await business.save();
    res.status(200).json({
      id: req.params.id,
      poppinscore: business.poppinscore,
      currentcapacity: business.currentcapacity,
      location: business.location,
      image: business.image,
      businessname: business.businessname,
      phonenumber: business.phonenumber,
      incentive: business.incentive,
    });
  }catch (err) {
    console.log(err, 'Error in updateBusiness');
    return next(err);
  }
};

//Check Deal Code
const checkDealCode = async (req, res, next) => {
  const { code } = req.body;

  try {
    const business = await Business.findByPk(req.params.id);
    const currentcode = business.currentcode;
    console.log('code from db ==>', currentcode);
    console.log('req.bodycode ==>', code);
    if (code === currentcode) {
      //push current code into database in column storedcodes
      business.storedcodes.push(currentcode);
      const codestouse = business.codestouse;
      const newCode = codestouse.pop();
      //set currentcode to new code in db
      await Business.update(
        {
          currentcode: newCode,
          codestouse: codestouse,
          storedcodes: business.storedcodes,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.status(200).json({
        message: 'Code matched, new code generated',
        nextCode: newCode,
        codestouse: codestouse,
        storedcodes: business.storedcodes,
      });
    } else {
      res.status(400);
      throw new Error('code does not match');
    }
  } catch (err) {
    console.log(err, 'error in getDealCode');
    return next(err);
  }
};

// Delete Business
const deleteBusiness = async (req, res, next) => {
  try {
    const business = await Business.destroy({ id: req.params.id });
    console.log('Business removed!!');
    res.status(200).json({ message: 'Business removed!' });
  } catch (err) {
    console.log(err, 'Error in deleteBusiness');
    return next(err);
  }
};

module.exports = { businessRegister, loginBusiness, updateBusiness, checkDealCode, deleteBusiness };