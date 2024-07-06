import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import uploadAvatarOnCloudinary from "../utils/cloudinary.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username && !email && !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  let avatarLocalPath;
  if (req.file) {
    avatarLocalPath = req.file.path;
  }

  // Upload avatar to Cloudinary
  let avatar;
  if (avatarLocalPath) {
    try {
      avatar = await uploadAvatarOnCloudinary(avatarLocalPath);
    } catch (error) {
      console.log(error);
    }
  }

  if (!avatar || avatar === null) {
    return res.status(400).json({
      message: "Avatar required",
    });
  }

  const user = await User.create({
    username,
    email,
    avatar: avatar?.url,
    password,
  });

  if (!user) {
    return res.status(500).json({ message: "User registration failed." });
  }

  return res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id),
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if(!(await user.isPasswordCorrect(password))){
    return res.status(400).json({ message: "Invalid password" });
  }
  return res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    avatar: user.avatar,
    token: generateToken(user._id),
  })
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Old password is incorrect." });
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json({ message: "Password changed successfully" });
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    return res.status(400).json({ message: "Avatar image is required." });
  }

  const avatar = await uploadAvatarOnCloudinary(avatarLocalPath);

  if (!avatar || avatar === null) {
    return res.status(500).json({ message: "Avatar upload failed." });
  }

  const user = await User.findByIdAndUpdate(
    req.body?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res.status(200).json({ message: "Avatar updated sucessfully" });
});

export { registerUser, loginUser, changePassword, updateUserAvatar };
