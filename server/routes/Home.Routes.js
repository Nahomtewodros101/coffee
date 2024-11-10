import express from "express";
import { getShops } from "../controller/shop.controller.js";
// import { homeRoutes } from "../controller/shop.controller.js";
import { postShops } from "../controller/shop.controller.js";
import { addFavorite, getFavorites, getShopById } from "../controller/shop.controller.js";
const router = express.Router();

router.get("/", getShops);
router.get("/:id", getShopById);
router.post("/", postShops);
router.post("/fav/:userId", addFavorite);
router.get("/fav/:userId", getFavorites);

export default router;
