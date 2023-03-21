import { query, Request, Response, Router } from "express";
import database from "../db";
import axios from "axios";
import { Op } from "sequelize";
const router = Router();

const { catalogs, product, images } = database.models;
//CREATE CATALOG
router.post("/catalogs/catalog", async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const newCatalog: any = await catalogs.findOrCreate({
      where: {
        name,
      },
    });
    res.status(200).json({
      message: `Catalog ${name} created successfully`,
      data: newCatalog[0],
      action: "Create Catalog",
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
// PROCESS CSV
router.post(
  "/catalogs/:catalog_id/csv",
  async (req: Request, res: Response) => {
    const { catalog_id: catalogId } = req.params;
    const jsonData = req.body;

    try {
      const processedData = jsonData
        .map((obj: any) => {
          return Object.fromEntries(
            Object.entries(obj).filter(([key, value]: any) => !!key && !!value)
          );
        })
        .map((obj: any, index: number) => ({
          catalog_id: catalogId,
          allImages: obj.Images,
          ...obj,
        }))
        .filter((obj: any) => obj.description && obj.title && obj.image);

      res.status(200).json(processedData);
    } catch (err: any) {
      res
        .status(503)
        .send(`Could not process the csv because of: ${err.message}`);
    }
  }
);
//ADD PRODUCTS
router.post(
  "/catalogs/:catalog_id/products",
  async (req: Request, res: Response) => {
    const catalogId = req.params.catalog_id;
    const products = req.body;
    let productsAmount = 0;
    try {
      for (const prod of products) {
        const {
          id,
          title,
          Title,
          description,
          catalog_id,
          image,
          allImages,
          ...extraAttributes
        } = prod;
        const extraImages = allImages
          ? allImages.split(",").map((url: string) => url?.trim())
          : [];
        const newProduct: any = await product.findOrCreate({
          where: {
            name: title,
            description,
            image,
            catalogId: catalog_id,
            dinamicFields: { ...extraAttributes },
          },
          include: {
            model: catalogs,
          },
        });
        const createdImages = await images.bulkCreate(
          extraImages.map((url: string) => ({ url }))
        );
        // product hasMany images, the following set the productId to all the images
        await newProduct[0].setImages(createdImages);
        await newProduct[0].setCatalog(catalog_id);
        productsAmount += 1;
      }
      const catalog = await catalogs.findByPk(catalogId);

      res.status(200).json({
        action: "Upload products",
        message: `${productsAmount} ${
          productsAmount > 1 ? "products were" : "product was"
        } added successfuly in catalog "${catalog?.dataValues.name}"`,
        data: catalog,
      });
    } catch (err: any) {
      console.log(err);
      res.status(503).send(err.message);
    }
  }
);

//GET CATALOGS
router.get("/catalogs", async (req: Request, res: Response) => {
  // await insertData(product, catalogs);
  const { term } = req.query;
  if (term) {
    try {
      const allCatalogs = await catalogs.findAll({
        where: {
          name: {
            [Op.iLike]: `%${term}%`,
          },
        },
        include: {
          model: product,
        },
        order: [["createdAt", "DESC"]],
      });
      const fullData = allCatalogs.map((cat: any) => ({
        ...cat.dataValues,
        productCount: cat.dataValues.products.length,
      }));
      // const data = fullData.length ? fullData : "Catalog not found";
      res.status(200).send(fullData);
    } catch (err) {
      res.status(404).send(err);
    }
  } else {
    try {
      const allCatalogs = await catalogs.findAll({
        include: {
          model: product,
        },
        order: [["createdAt", "DESC"]],
      });
      const fullData = allCatalogs.map((cat: any) => ({
        ...cat.dataValues,
        productCount: cat.dataValues.products.length,
      }));
      res.status(200).json(fullData);
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  }
});

//GET CATALOG BY ID
router.get("/catalogs/:catalogId", async (req: Request, res: Response) => {
  const { catalogId } = req.params;
  try {
    const fullCatalog: any = await catalogs.findByPk(catalogId, {
      include: {
        model: product,
      },
    });
    const allProductsAttributes = fullCatalog.products.map((prod: any) => {
      const { dinamicFields } = prod.dataValues;
      return { ...prod.dataValues, ...dinamicFields };
    });

    res
      .status(200)
      .json({ ...fullCatalog.dataValues, products: allProductsAttributes });
  } catch (error) {
    console.log(error);
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
// DELETE PRODUCTS
router.delete("/catalogs/:id/products", async (req: Request, res: Response) => {
  const { id } = req.params;
  const productsId = req.body;
  const currentCatalog = await catalogs.findByPk(id);
  try {
    const removedProducts: any = await product.destroy({
      where: {
        id: {
          [Op.in]: productsId,
        },
        catalogId: id,
      },
    });
    res.status(200).json({
      action: "Delete products",
      message: `${removedProducts} ${
        removedProducts > 1 ? "products have" : "product has"
      } been deleted from the catalog called "${
        currentCatalog?.dataValues.name
      }"`,
      data: currentCatalog,
    });
  } catch (err) {
    res.sendStatus(503);
  }
});
// Update Catalog
router.put("/catalogs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  const currentCatalog: any = await catalogs.findByPk(id);
  const catalogName = currentCatalog?.name;
  try {
    const updatedCatalog = await currentCatalog.update({
      ...currentCatalog,
      name,
    });
    res.status(200).json({
      action: "Update Catalog",
      message: `Catalog "${catalogName}" has been updated to "${updatedCatalog.name}" `,
      data: updatedCatalog,
    });
  } catch (err) {
    res.status(503).send(err);
  }
});
// DELETE CATALOIG
router.delete("/catalogs/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const currentCatalog: any = await catalogs.findByPk(id);
    const catalogName = currentCatalog.name;
    await currentCatalog.destroy();
    res.status(200).json({
      action: "Remove Catalog",
      message: `Catalog "${catalogName}" was removed successfully`,
      data: currentCatalog,
    });
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
      name: `${catalogName} (copy)`,
      created_at: new Date(),
    });

    // we cannot use bulkCreate because of the images relationship setting
    for (let { dataValues } of catalogProducts) {
      if (dataValues) {
        // getting the attributes we care to duplicate
        const {
          id,
          catalog_id,
          images: extraImages,
          catalogId,
          ...attributes
        } = dataValues;

        try {
          // create new products based on the products attributes
          const createdClone: any = await product.create({
            ...attributes,
          });

          // parsing the images so that we are able to clone them
          const currentImages = extraImages?.length
            ? extraImages.map(({ dataValues }: any) => ({
                url: dataValues.url,
              }))
            : [];

          // cloning the images
          const clonedImages: any = await images.bulkCreate(currentImages);

          // setting the catalogId to the prodduct
          await createdClone.setCatalog(clonedCatalog.id);

          // setting the productId to every image
          await createdClone.setImages(clonedImages);
        } catch (err) {
          console.log(err);
        }
      }
    }
    res.status(200).json({
      action: "Duplicate catalog",
      message: `The catalog "${catalogName}" was duplicated successfully`,
      data: clonedCatalog.dataValues,
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
