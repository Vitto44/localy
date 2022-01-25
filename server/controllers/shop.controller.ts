import { Request, Response } from "express";
import { User } from "../models/users.model";

const Shop = require("../models/shops.model");
const cloudinary = require("../utils/cloudinary");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const findShopsByUserId = async (req: Request, res: Response) => {
  try {
    let UserId = req.session.uid;
    1;

    const shops = await Shop.findAll({
      where: {
        UserId: UserId,
      },
    });
    res.status(200).send(shops);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUserShop = async (req: Request, res: Response) => {
  try {
    const shop = await Shop.findByPk(req.body.id);
    if (shop) {
      await shop.destroy();
      res.status(202).send("Shop obliterated");
    } else {
      res.status(404).send({ message: "Shop not found.", error: "404" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      error: "400",
      message: "Shop too gud to delete, please reconsider.",
    });
  }
};

const createShop = async (req: Request, res: Response) => {
  try {
    // we are assuming that we are gettin an already built SHOP object from the frontend
    // so req.body should MATCH the SHOP MODEL
    // if req.body does not match the MODEL it will catch an error
    const shop = await Shop.create(req.body);
    res.status(201).send(shop);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not create shop" });
  }
};

const addProducts = async (req: Request, res: Response) => {
  try {
    const { products, shopId } = req.body;
    Shop.findOne({
      where: { id: shopId },
    })
      .then((shop: any) => {
        const oldProducts = shop.products;
        const productAlreadyExists = products.some((el: String) =>
          oldProducts.includes(el)
        );
        if (oldProducts && !productAlreadyExists) {
          return shop.set({
            products: [...oldProducts, ...products],
          });
        } else if (oldProducts && productAlreadyExists) {
          throw new Error();
        } else {
          return shop.set({
            products: [...products],
          });
        }
      })
      .then((shop: any) => {
        shop.save();
        res.status(200).send(shop.products);
      })
      .catch((err: Error) => {
        res
          .status(404)
          .send("Already some products already in database, already");
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not add product" });
  }
};

const removeProduct = async (req: Request, res: Response) => {
  try {
    const { product, shopId } = req.body;
    Shop.findOne({
      where: { id: shopId },
    })
      .then((shop: typeof Shop) => {
        return shop.set({
          products: [...shop.products].filter((el) => el !== product),
        });
      })
      .then((shop: any) => {
        shop.save();
        res.status(200).send(shop.products);
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not create shop" });
  }
};

const findShopsByKeyword = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    const shops = await Shop.findAll({
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
  } catch (error) {
    res.sendStatus(500);
  }
};

const addImageToShop = async (req: Request, res: Response) => {
  //this one, we need a frontend to test and redone
  try {
    const { picture, shopId } = req.body;
    Shop.findOne({
      where: { id: shopId },
    }).then((shop: any) => {
      shop.set({});
      res.status(200).send(shop);
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not create shop" });
  }
};

module.exports = {
  createShop,
  addImageToShop,
  addProducts,
  removeProduct,
  deleteUserShop,
  findShopsByUserId,
  findShopsByKeyword,
};
