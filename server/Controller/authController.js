import lmsCollection from '../Model/lmsModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// SIGN UP
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await lmsCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new lmsCollection({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkMail = await lmsCollection.findOne({ email });
    if (!checkMail) {
      return res.status(500).json({ message: "Invalid credential" });
    }

    const pass=await bycrypt.compare(password, user.password)
    if (!pass){
        return res.staus(500).json({ message: "Invalid credential" });
     }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
