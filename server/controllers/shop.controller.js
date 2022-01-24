const Shop = require("../models/shops.model");
const cloudinary = require("../utils/cloudinary");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const findShopsByUserId = async (req, res) => {
  try {
    let UserId = req.session.uid;
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

const deleteUserShop = async (req, res) => {
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

const createShop = async (req, res) => {
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

const addProducts = async (req, res) => {
  try {
    const { products, shopId } = req.body;
    Shop.findOne({
      where: { id: shopId },
    })
      .then((shop) => {
        const oldProducts = shop.products;
        const productAlreadyExists = products.some((el) =>
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
      .then((shop) => {
        shop.save();
        res.status(200).send(shop.products);
      })
      .catch((err) => {
        res
          .status(404)
          .send("Already some products already in database, already");
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not add product" });
  }
};

const removeProduct = async (req, res) => {
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
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "400", message: "Could not create shop" });
  }
};

const findShopsByKeyword = async (req, res) => {
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

const addImageToShop = async (req, res) => {
  //this one, we need a frontend to test and redone
  try {
    const { picture, shopId } = req.body;
    Shop.findOne({
      where: { id: shopId },
    }).then((shop) => {
      shop.set({});
    });

    res.status(200).send(shop);
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
