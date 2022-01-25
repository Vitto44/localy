"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const userController = require("./controllers/user.controller");
const shopController = require("./controllers/shop.controller");
const imageUploadController = require("./controllers/image.controller");
const authMiddleware = require("./middlewares/auth");
// user routes
router.get("/login", authMiddleware, userController.login); // auth user
router.post("/login", userController.login); // login user, get user da
router.post("/create", userController.create); // create user
router.delete("/delete", authMiddleware, userController.deleteUser); // delete
router.get("/logout", authMiddleware, userController.logout);
// shops routes
router.get("/userShops", authMiddleware, shopController.findShopsByUserId); //shop find by ID
router.delete("/userShops", authMiddleware, shopController.deleteUserShop); //wanna guess?
router.post("/createShop", shopController.createShop); //create shop
router.put("/addProducts", shopController.addProducts); //add product
router.put("/removeProduct", shopController.removeProduct); //remove product
router.put("/addImageToShop", shopController.addImageToShop); //add shop image
router.post("/search?", shopController.findShopsByKeyword); //find by word
router.put("/shop", imageUploadController.upload); //upload image
// 404 route
router.all("*", (req, res) => res.status(400).send("How TF did you ended up here?"));
module.exports = router;
