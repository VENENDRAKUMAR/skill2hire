// controllers/auth.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";
import jwt from "jsonwebtoken";
import { uploadcloudinary } from "../utils/cloudinary.js";

// ----------------------------------------------
// Generate Tokens
// ----------------------------------------------
const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    throw new ApiError(500, "Token generation failed");
  }
};

// ----------------------------------------------
// REGISTER USER
// ----------------------------------------------
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password, role } = req.body;

  if (!fullName || !email || !username || !password || !role) {
    throw new ApiError(400, "All fields are required");
  }

  const exist = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (exist) throw new ApiError(409, "Email or Username already exists");

  const avatarPath = req.file?.path;
  let avatarUrl = "";

  if (avatarPath) {
    const uploaded = await uploadcloudinary(avatarPath, "avatars");
    avatarUrl = uploaded.url;
  }

  const user = await User.create({
    fullName,
    email,
    username,
    role,
    password,
    avatar: avatarUrl,
  });

  const created = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(200, created, "User Registered Successfully"));
});

// ----------------------------------------------
// LOGIN USER
// ----------------------------------------------
export const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new ApiError(400, "Email or Username required");
  }

  const user = await User.findOne({ $or: [{ email }, { username }] });

  if (!user) throw new ApiError(404, "User not found");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "Logged in Successfully"
      )
    );
});

// ----------------------------------------------
// LOGOUT USER
// ----------------------------------------------
export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Logged out"));
});

// ----------------------------------------------
// REFRESH TOKEN
// ----------------------------------------------
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  if (!token) throw new ApiError(401, "No refresh token found");

  const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decoded._id);

  if (!user || user.refreshToken !== token) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const option = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed"));
});

// ----------------------------------------------
// CHANGE PASSWORD
// ----------------------------------------------
export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isValid = await user.isPasswordCorrect(oldPassword);

  if (!isValid) throw new ApiError(400, "Old password is wrong");

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

// ----------------------------------------------
// GET CURRENT USER
// ----------------------------------------------
export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "User Fetched"));
});

// ----------------------------------------------
// UPDATE ACCOUNT
// ----------------------------------------------
export const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) throw new ApiError(400, "All fields required");

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { fullName, email },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account updated"));
});

// ----------------------------------------------
// UPDATE PROFILE IMAGE
// ----------------------------------------------
export const updateProfileImage = asyncHandler(async (req, res) => {
  const imagePath = req.file?.path;
  if (!imagePath) throw new ApiError(400, "Image missing");

  const uploaded = await uploadcloudinary(imagePath, "avatars");

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: uploaded.url } },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Profile image updated"));
});
