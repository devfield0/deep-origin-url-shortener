import passport from 'passport';
import mongoose from "mongoose";
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User';

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser((id: string, done) => {
  User.findById(id, (err: any, user: any) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // Adjust as per your form field name
    passwordField: 'password', // Adjust as per your form field name
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect email or password' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

export default passport;
