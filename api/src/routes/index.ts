import { Model } from "sequelize";
import { Request, Response, Router } from "express";
import database from "../db";
import axios from "axios";
const router = Router();

const { catalogs, product } = database.models;
//CREATE CATALOG
router.post("/catalogs/catalog", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCatalog = await catalogs.findOrCreate({
      where: {
        name,
        created_at: new Date(),
      },
    });
    res.status(200).json(newCatalog);
  } catch (err) {
    res.send(err);
  }
});

//ADD PRODUCTS
router.post(
  "/catalogs/:catalog_id/products",
  async (req: Request, res: Response) => {
    // catalog_id may be redundant but we could take it from params
    const products = req.body;
    try {
      for (const prod of products) {
        const { id, title, description, catalog_id, image } = prod;

        await product.findOrCreate({
          where: {
            // id,
            name: title,
            description,
            catalog_id,
            image,
          },
        });
      }
      res.status(200).send("Products added successfuly");
    } catch (err: any) {
      res.status(503).send(err.message);
    }
  }
);

//GET CATALOGS
router.get("/catalogs", async (req: Request, res: Response) => {
  // await insertData(product, catalogs);
  try {
    const allCatalogs = await catalogs.findAll();
    const fullData = [];

    for (const catalog of allCatalogs) {
      const id = catalog.dataValues.id;
      const catalogProducts = await product.findAll({
        where: {
          catalog_id: id,
        },
        order: [
          ["created_at", "DESC"],
          ["name", "ASC"],
        ],
      });

      const productCount = catalogProducts.length;

      fullData.push({
        ...catalog.dataValues,
        productCount,
        products: catalogProducts,
      });
    }

    res.status(200).json(fullData);
  } catch (err) {
    res.status(404).send(err);
  }
});

//GET CATALOG BY ID
router.get("/catalogs/:catalogId", async (req: Request, res: Response) => {
  const { catalogId } = req.params;
  let fullData = [];
  try {
    const catalogProducts = await catalogs.findAll({
      where: {
        id: catalogId,
      },
    });
    const products = await product.findAll({
      where: {
        catalog_id: catalogId,
      },
    });

    fullData = [
      {
        ...catalogProducts[0].dataValues,
        products,
      },
    ];
    res.status(200).json(fullData);
  } catch (error) {
    res.status(503).send(error);
  }
});
// GET A SINGLE PRODUCT
router.get(
  "/catalogs/:catalogId/:productId",
  async (req: Request, res: Response) => {
    const { catalogId, productId } = req.params;

    try {
      const currentProd = await product.findByPk(productId);
      res.status(200).json(currentProd);
    } catch (error) {
      res.status(503).send(error);
    }
  }
);

// Update Catalog
router.put("/catalogs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const currentCatalog: any = await catalogs.findByPk(id);
    const updatedCatalog = await currentCatalog.update({
      ...currentCatalog,
      name,
    });
    res.status(200).send(updatedCatalog);
  } catch (err) {
    res.status(503).send(err);
  }
});
// DELETE CATALOIG
router.delete("/catalogs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  // Here we should also should remove all the products related to this catalot
  // To do that y might need to make the relationship in sequelize
  try {
    const currentCatalog: any = await catalogs.findByPk(id);
    const catalogName = currentCatalog.name;
    await currentCatalog.destroy();
    res.status(200).send(`${catalogName} deleted successfully `);
  } catch (err) {
    res.status(503).send(err);
  }
});
// FUNCTION TO TEST: CREATE A CATALOG WITH PRODUCTS
async function insertData(product: any, catalogs: any) {
  //inserting one catalog
  try {
    await catalogs.findOrCreate({
      where: {
        name: "Test catalog",
        description: "This is the first catalog",
      },
    });
  } catch (e: any) {
    console.log(e);
  }
  const uniqueCatalog = await catalogs.findOne({
    where: { name: "Test catalog" },
  });

  const json = await axios
    .get("https://dummyjson.com/products")
    .then((r) => r.data.products)
    .catch((e) => []);

  if (json.length) {
    for (const prod of json) {
      const { title: name, description, images } = prod;

      await product.findOrCreate({
        where: {
          name,
          description,
          image: images[0],
          created_at: new Date(),
          catalog_id: uniqueCatalog?.dataValues?.id,
        },
      });
    }
  }
}
export default router;
