import express, { Request, Response } from 'express';
import passport from 'passport';
import User, { IUser } from '../models/User';

const router = express.Router();

// User signup
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser: IUser | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new user
    const newUser: IUser = new User({ email, password });
    await newUser.save();

    res.status(201).json({ newUser });
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ error: 'Signup failed' });
  }
});


// User login
router.post('/login', passport.authenticate('local'), (req: Request, res: Response) => {
  res.json(req.user);
});

// User logout
router.post('/logout', (req: Request, res: Response) => {
  req.logout(() => { });
  res.json({ message: 'Logout successful' });
});

export default router;
