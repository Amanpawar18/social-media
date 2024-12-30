import { asyncHandler } from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utlis/Cloudinary.js";
import { ApiResponse } from "../utlis/ApiResponse.js";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required.");
  }

  const avatarPath = await uploadOnCloudinary(avatarLocalPath);
  const coverImagePath = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatarPath) {
    throw new ApiError(400, "Avatar file failed to upload on cloudinary.");
  }

  const user = await User.create({
    fullName,
    avatar: avatarPath.url,
    coverImage: coverImagePath?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Failed to create user in DB !!");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered succesfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username || !email)
    throw new ApiError(400, "Username or email is required");

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) throw new ApiError(400, "Username or email is required");

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) throw new ApiError(401, "Password is incorrect");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully !!"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully !!"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || undefined;
  // const incomingRefreshToken = req.refreshToken;

  if (!incomingRefreshToken) throw new ApiError(400, "Unauthorised access");

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodedToken?._id);

  if (!user) throw new ApiError(400, "Invalid refresh token");

  console.log(user.refreshToken);
  if (incomingRefreshToken != user.refreshToken)
    throw new ApiError(400, "Refresh token is expired or used");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access and refresh token updated successfully !!"
      )
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = req.user;
  const loggedInUser = await User.findById(user?._id);

  if (!user) throw new ApiError(400, "unauthorized access");

  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Password updated successfully !!"));
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;

    await user.save({ validationBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access & refresh token"
    );
  }
};

const getUserDetails = asyncHandler(async (req, res) => {
  return res
    .status(201)
    .json(new ApiResponse(200, req.user, "User deatils fetch successfully !!"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!(fullName || email))
    throw new ApiError(400, "Fullname & email are required");

  const udpatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { user: udpatedUser },
        "User deatils fetch successfully !!"
      )
    );
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  // Todo: Remove the old image from cloudinary

  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

  const newAvatar = await uploadOnCloudinary(avatarLocalPath);

  if (!newAvatar)
    throw new ApiError(500, "Not able to upload the avatar on cloudinary");

  const user = User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: newAvatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(200, user, "Avatar updated successfully !!"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  // Todo: Remove the old image from cloudinary

  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath)
    throw new ApiError(400, "Cover Image file is missing");

  const newCoverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!newCoverImage)
    throw new ApiError(500, "Not able to upload the cover Image on cloudinary");

  const user = User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: newCoverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(201)
    .json(new ApiResponse(200, user, "Cover Image updated successfully !!"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username) throw new ApiError(400, "Username is missing !!");

  const channel = await User.aggregate([
    {
      $match: {
        username: username?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptoins",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptoins",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscriberedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelSubscriberedToCount: {
          $size: "$subscriberedTo",
        },
        isSubscribed: {
          $cond: {
            if: {
              $in: [req.user?._id, "$subscribers.subscriber"],
              then: true,
              else: false,
            },
          },
        },
      },
    },
    {
      $project: {
        fullName: 1,
        username: 1,
        subscribersCount: 1,
        channelSubscriberedToCount: 1,
        isSubscribed: 1,
      },
    },
  ]);

  if (channel?.length) throw new ApiError(404, "Channel not found !!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "User channel fetched successfully !!")
    );
});

const getWatchedHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        forignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignFields: "_id",
              as: "owner",
              pipeling: [
                {
                  $project: {
                    fullName: 1,
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user[0].watchHistory,
        "Watch history Fetched successfully !!"
      )
    );
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  updateUserDetails,
  updateUserCoverImage,
  updateUserAvatar,
  getUserDetails,
  changeCurrentPassword,
  getUserChannelProfile,
};
