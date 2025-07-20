import { UsersCollection } from '../models/user.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { SessionsCollection } from '../models/session.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import mongoose from 'mongoose';


export const registerUser = async (payload) => {
    const { email, password } = payload;

    const existingUser = await UsersCollection.findOne({ email });
    if (existingUser) {
        throw createHttpError(409, 'There is alrerady a user registered under this email');
    }

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = await UsersCollection.create({
        ...payload,
        password: hashedPwd,
    });

    const userObj = user.toObject();
    delete userObj.password;

    return userObj;
};



export const loginUser = async (payload) => {
    const user = await UsersCollection.findOne({ email: payload.email });
    if (!user) {
        throw createHttpError(401, 'User not found');
    }

    const validPwd = await bcrypt.compare(payload.password, user.password);
    if (!validPwd) {
        throw createHttpError(401, 'Unauthorised');
    }

    await SessionsCollection.deleteOne({ userId: user._id });

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES); 
    const refreshTokenValidUntil = new Date(Date.now() + ONE_DAY); 

    return await SessionsCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
    });

};



export const logoutUser = async (sessionId) => {
    await SessionsCollection.deleteOne({_id: sessionId });
};


const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {

  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }
  
  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

