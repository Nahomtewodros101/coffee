import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteShops: [{ type: mongoose.Schema.Types.ObjectId, ref: "CoffeeShop" }],
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if the password is new or modified
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to verify password
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const user = new mongoose.model("user", userSchema);

export default user;
