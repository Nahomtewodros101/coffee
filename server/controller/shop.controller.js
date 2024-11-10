import CoffeeShop from "../models/coffeShop.model.js";
import User from "../models/user.model.js";

export const getShops = async (req, res) => {
  try {
    const shops = await CoffeeShop.find({});
    if (shops.length > 0) {
      res.status(200).json(shops);
    } else {
      res.status(404).json({ message: "No coffee shops found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Oops, server problems!👨🏾‍💻" });
  }
};

export const postShops = async (req, res) => {
  try {
    const { name, address, location } = req.body;
    const shopExists = await CoffeeShop.findOne({ name });

    if (shopExists) {
      return res.status(400).json({ message: "Shop already exists" });
    }

    const newShop = new CoffeeShop({ name, address, location });
    await newShop.save();
    res.status(201).json({ message: "Shop created successfully", newShop });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating shop" });
  }
};

// Controller to add a coffee shop to user's favorites
export const addFavorite = async (req, res) => {
  const { userId } = req.params;
  const { shopId } = req.body;

  try {
    const user = await User.findById(userId);
    const shop = await CoffeeShop.findById(shopId);

    if (!user || !shop) {
      return res.status(404).json({ message: "User or Shop not found" });
    }

    if (!user.favoriteShops.includes(shopId)) {
      user.favoriteShops.push(shopId);
      await user.save();
    }

    res.status(200).json({
      message: "Shop added to favorites",
      favorites: user.favoriteShops,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding favorite shop", error });
  }
};

// Controller to get all favorite shops for a user
export const getFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate("favoriteShops"); // Ensure 'favoriteShops' is the correct field
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.favoriteShops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getShopById = async (req, res) => {
  try {
    const { id } = req.params;
    const shop = await CoffeeShop.findById(id);
    if (shop) {
      res.status(200).json(shop);
    } else {
      res.status(404).json({ message: "Shop not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Oops, server problems!👨🏾‍💻" });
  }
};
