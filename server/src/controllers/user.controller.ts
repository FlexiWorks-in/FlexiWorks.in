import { Request, Response } from 'express';

import { asyncHandler } from '../utils/asyncHandler';
import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import User from '../models/user.model';
import logger from '../logger';

const generateAccessAndRefreshTokens = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    logger.error(error);
    throw new ApiError(
      500,
      'Something went wrong while generating refresh and access token'
    );
  }
};

const registerUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { firstName, lastName, email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser)
      throw new ApiError(409, 'User with email or username already exists');

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      '-password -refreshToken'
    );
    return res
      .status(201)
      .json(new ApiResponse(201, 'User registered Successfully', createdUser));
  }
);

const loginUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new ApiError(404, 'User does not exist');

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      throw new ApiError(401, 'Invalid user credentials');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      '-password -refreshToken'
    );

    const options = {
      httpOnly: true,
    };

    return res
      .status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', refreshToken, options)
      .json(
        new ApiResponse(200, 'User logged In Successfully', {
          user: loggedInUser,
          accessToken,
          refreshToken,
        })
      );
  }
);

const logoutUser = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    logger.info('logoutUser :: req: ', req);
    await User.findByIdAndUpdate(req.user._id, {
      $unset: { refreshToken: 1 },
    });

    return res
      .status(200)
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .json(new ApiResponse(200, 'User logged out Successfully'));
  }
);

export { loginUser, registerUser, logoutUser };
