const bcrypt = require('bcrypt');
const User = require('../models/users.js');
const Vendor = require('../models/vendors.js');

const otpGenerator = require('otp-generator');
const twilio =require('twilio');
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const { configDotenv } = require('dotenv');
configDotenv()
const generateToken = (userId) => {
  return jwt.sign({ userId }, 'okjnlk', { expiresIn: '1h' });
};

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex'); 
};

const secretKey = generateSecretKey();

  const signup = async (req, res) => {
   
    try {
        const { confirmPassword,email,firstName,lastName, password,accountType,phone} = req.body;
        let UserModel;

      if (accountType === 'user') {
        UserModel = User;
      } else if (accountType === 'vendor') {
        UserModel = Vendor; 
      } else {
        return res.status(400).json({ error: 'Invalid account type' });
      }
  
      if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false, alphabets: false });

    
        const newUser = new UserModel({
          firstName,
          lastName,
          email,
          password: hashedPassword,        
          accountType,
          confirmPassword,
          phone
        });
  
     
        const savedUser = await newUser.save();
    
        res.status(201).json({ message: 'User created successfully', user: savedUser });
      
      }
     
    } catch (error) {
      console.error('Error signing up:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  const login = async (req, res) => {
    try {
      const { email, password, accountType } = req.body;
  
      let UserModel;
  
      if (accountType === 'user') {
        UserModel = User;
      } else if (accountType === 'vendor') {
        UserModel = Vendor; 
      } else {
        return res.status(400).json({ error: 'Invalid account type' });
      }
    

      const existingUser = await UserModel.findOne({ email });
   
      if (!existingUser) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const passwordMatch = await bcrypt.compare(password, existingUser.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      const token = generateToken(existingUser._id);
  
      const { firstName, lastName ,_id} = existingUser;
  
      res.status(200).json({
        message: 'Login successful',
        token,
        accountType,
        _id,
        user: {
          firstName,
          lastName,
        },
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    signup,
    login,
  };

