import { Model } from "sequelize";
import { Request, Response, Router } from "express";
import database from "../db";
import axios from "axios";
const router = Router();

const { catalogs, product, images } = database.models;
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
        const { id, title, description, catalog_id, image, allImages } = prod;
        const extraImages = allImages
          ? allImages.split(",").map((url: string) => url?.trim())
          : [];

        const newProduct: any = await product.findOrCreate({
          where: {
            // id,
            name: title,
            description,
            image,
          },
        });

        const createdImages = await images.bulkCreate(
          extraImages.map((url: string) => ({ url }))
        );
        await newProduct[0].setImages(createdImages);
        await newProduct[0].setCatalog(catalog_id);
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
    const allCatalogs = await catalogs.findAll({
      include: {
        model: product,
      },
    });
    const fullData = allCatalogs.map((cat: any) => ({
      ...cat.dataValues,
      productCount: cat.dataValues.products.length,
    }));
    res.status(200).json(fullData);
  } catch (err) {
    res.status(404).send(err);
  }
});

//GET CATALOG BY ID
router.get("/catalogs/:catalogId", async (req: Request, res: Response) => {
  const { catalogId } = req.params;
  try {
    const catalogProducts: any = await catalogs.findByPk(catalogId, {
      include: {
        model: product,
      },
    });
    res.status(200).json(catalogProducts);
  } catch (error) {
    res.status(503).send(error);
  }
});
// GET A SINGLE PRODUCT
router.get(
  "/catalogs/:catalogId/:productId",
  async (req: Request, res: Response) => {
    const { productId } = req.params;
    try {
      const currentProd = await product.findByPk(productId, {
        include: {
          model: images,
        },
      });
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
// DUPLICATE CATALOG
router.post("/catalogs/:id/clone", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const currentCatalog: any = await catalogs.findByPk(id);
    const catalogName = currentCatalog.name;
    const catalogProducts: any = await product.findAll({
      where: {
        catalogId: id,
      },
      include: {
        model: images,
      },
    });

    const clonedCatalog: any = await catalogs.create({
      name: `${catalogName}(copy)`,
      created_at: new Date(),
    });
    // console.log(catalogProducts);

    for (let productData of catalogProducts) {
      if (productData.dataValues) {
        const { id, catalog_id, ...attributes } = productData.dataValues;
        // we cannot use bulkCreate because of the images relationship setting
        const createdClone: any = await product.create({
          ...attributes,
        });
        const currentImages = productData.dataValues.images.map(
          ({ dataValues }: any) => ({ url: dataValues.url })
        );
        const clonesImages = await images.bulkCreate(currentImages);
        await createdClone[0].setCatalog(clonedCatalog.id);
        await createdClone[0].setImages(clonesImages);
      }
    }

    // const clonedProducts = await product.bulkCreate(attributes);
    console.log(clonedCatalog);
    res.status(200).json({
      message: `${catalogName} duplicated successfully`,
      ...clonedCatalog.dataValues,
      // products: clonedProducts,
    });
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
