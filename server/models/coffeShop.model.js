import mongoose from "mongoose";

const coffeeShopSchema = new mongoose.Schema({
  name: String,
  address: String,
  location: {
    type: { type: String, enum: ["Point"], required: true },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

// Ensure that `location` is indexed as a 2dsphere index for geo queries
coffeeShopSchema.index({ location: "2dsphere" });

// Define and export the CoffeeShop model
const CoffeeShop = mongoose.model("CoffeeShop", coffeeShopSchema);

export default CoffeeShop;
