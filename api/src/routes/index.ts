import { Model } from "sequelize";
import { Request, Response, Router } from "express";
import database from "../db";
import axios from "axios";
const router = Router();

const { catalogs, product } = database.models;
//CREATE CATALOG
router.post("/catalogs/new", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const catalog = await catalogs.findOrCreate({
      where: {
        name,
        created_at: new Date(),
      },
    });
    res.status(200).send("Catalog created!");
  } catch (err) {
    res.send(err);
  }
});

//ADD PRODUCTS
router.post("/addproducts/:id", async (req: Request, res: Response) => {
  const products = req.body;
  console.log("cerooo--> ", products[0]);
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
    res.status(200).send("Products created");
  } catch (err: any) {
    res.status(503).send(err.message);
  }
});

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

    fullData.reverse();
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

//POST CREATE PRDODUCT
router.post("/catalogs/product/", async (req: Request, res: Response) => {
  const { catalog_id, name, description, image } = req.body;

  try {
    const newProduct = await product.findOrCreate({
      where: {
        name,
        description,
        image,
        catalog_id: catalog_id,
        // created_at: new Date(),
      },
    });
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(503).send(err);
  }
});

// DELETE PRODUCT
router.delete("/catalogs/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currentProduct: any = await product.findByPk(id);
    const productName = currentProduct?.name;
    await currentProduct?.destroy();
    res.json(`${productName} deleted successfully `);
  } catch (err) {
    res.status(503).send(err);
  }
});

// Update todo
router.put("/catalogs/product/:id", async (req: Request, res: Response) => {
  const { id, name, description, image } = req.body;

  try {
    const item: any = await product.findByPk(id);
    item.update({
      ...item,
      name,
      description,
      image,
    });
    res.status(200).send(`Updated succeeded ${item}`);
  } catch (err) {
    res.status(503).send(err);
  }
});

// Update Catalog
router.put("/catalogs/update", async (req: Request, res: Response) => {
  const { id, name } = req.body;

  try {
    const currentCatalog: any = await catalogs.findByPk(id);

    currentCatalog.update({
      ...currentCatalog,
      name,
    });
    res.status(200).send(`Updated succeeded ${currentCatalog}`);
  } catch (err) {
    res.status(503).send(err);
  }
});
// DELETE CATALOIG
router.delete("/catalogs/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currentCatalog: any = await catalogs.findByPk(id);
    const catalogName = currentCatalog.name;
    await currentCatalog.destroy();
    res.status(200).send(`${catalogName} deleted successfully `);
  } catch (err) {
    res.status(503).send(err);
  }
});

// CARGHAR DATOS EN DB
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

  // inserting products
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
