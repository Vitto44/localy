"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Shop = require("../models/shops.model");
const cloudinary = require("../utils/cloudinary");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const findShopsByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let UserId = req.session.uid;
        const shops = yield Shop.findAll({
            where: {
                UserId: UserId,
            },
        });
        res.status(200).send(shops);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});
const deleteUserShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shop = yield Shop.findByPk(req.body.id);
        if (shop) {
            yield shop.destroy();
            res.status(202).send("Shop obliterated");
        }
        else {
            res.status(404).send({ message: "Shop not found.", error: "404" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            error: "400",
            message: "Shop too gud to delete, please reconsider.",
        });
    }
});
const createShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // we are assuming that we are gettin an already built SHOP object from the frontend
        // so req.body should MATCH the SHOP MODEL
        // if req.body does not match the MODEL it will catch an error
        const shop = yield Shop.create(req.body);
        res.status(201).send(shop);
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: "400", message: "Could not create shop" });
    }
});
const addProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { products, shopId } = req.body;
        Shop.findOne({
            where: { id: shopId },
        })
            .then((shop) => {
            const oldProducts = shop.products;
            const productAlreadyExists = products.some((el) => oldProducts.includes(el));
            if (oldProducts && !productAlreadyExists) {
                return shop.set({
                    products: [...oldProducts, ...products],
                });
            }
            else if (oldProducts && productAlreadyExists) {
                throw new Error();
            }
            else {
                return shop.set({
                    products: [...products],
                });
            }
        })
            .then((shop) => {
            shop.save();
            res.status(200).send(shop.products);
        })
            .catch((err) => {
            res
                .status(404)
                .send("Already some products already in database, already");
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: "400", message: "Could not add product" });
    }
});
const removeProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { product, shopId } = req.body;
        Shop.findOne({
            where: { id: shopId },
        })
            .then((shop) => {
            return shop.set({
                products: [...shop.products].filter((el) => el !== product),
            });
        })
            .then((shop) => {
            shop.save();
            res.status(200).send(shop.products);
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: "400", message: "Could not create shop" });
    }
});
const findShopsByKeyword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q } = req.query;
        const shops = yield Shop.findAll({
            where: {
                [Op.or]: [
                    {
                        products: { [Op.contains]: [`${q}`] },
                    },
                    {
                        name: { [Op.substring]: `${q}` },
                    },
                ],
            },
        });
        res.status(200).send(shops);
    }
    catch (error) {
        res.sendStatus(500);
    }
});
const addImageToShop = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //this one, we need a frontend to test and redone
    try {
        const { picture, shopId } = req.body;
        Shop.findOne({
            where: { id: shopId },
        }).then((shop) => {
            shop.set({});
            res.status(200).send(shop);
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ error: "400", message: "Could not create shop" });
    }
});
module.exports = {
    createShop,
    addImageToShop,
    addProducts,
    removeProduct,
    deleteUserShop,
    findShopsByUserId,
    findShopsByKeyword,
};
