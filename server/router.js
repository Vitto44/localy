const express = require("express");
const router = express.Router();
const findController = require("./controllers/findshops.controller");
const userController = require("./controllers/user.controller");
const shopController = require("./controllers/shop.controller");
const imageUploadController = require("./controllers/image.controller");
const authMiddleware = require("./middlewares/auth");

// search routes
router.post("/search", findController.findShopsByKeyword); //find by word

// shops routes
router.get("/shop", findController.findShopsByUserId); //shop find by ID
router.post("/shop", shopController.createShop); //create shop
router.put("/shop", shopController.addImageToShop); //add image of a shop
router.put("/shop", shopController.addProductsToShop); //add product
router.put("/shop", shopController.removeProduct); //remove product
router.put("/shop", imageUploadController.upload); //upload image
router.delete("/shop", authMiddleware, shopController.deleteShop); //wanna guess?

// user routes
// router.post("/user", userController.create); // create user
router.post("/user", userController.login); // login user
router.get("/user", authMiddleware, userController.login); // login user
router.delete("/user", authMiddleware, userController.deleteUser); // delete user
router.get("/profile", userController.profile);
router.post("/logout", authMiddleware, userController.logout);

// 404 route
router.all("/*", (req, res) => res.send("Page not found").status(404)); //404

module.exports = router;
