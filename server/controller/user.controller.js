import user from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await user.find({});
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops, server problems!👨🏾‍💻" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await user.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops, server problems!👨🏾‍💻" });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await user.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new user({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops, server problems!👨🏾‍💻" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  try {
    const updatedUser = await user.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops, server problems!👨🏾‍💻" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await user.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Oops, server problems!👨🏾‍💻" });
  }
};
