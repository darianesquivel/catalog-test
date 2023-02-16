import fs from "fs";
import { Request, Response, Router } from "express";
import database from "../db";
import axios from "axios";
const router = Router();

const { catalogs, product } = database.models;

// router.get("/catalogs", (req: Request, res: Response) => {
//   catalogs
//     .findAll()
//     .then((data) => console.log({ data }))
//     .catch((err) => console.log(err));

//   res.send("testinnnnnng");
// });

// router.get("/catalogs/:catalogId", (req: Request, res: Response) => {
//   const { catalogId } = req.params;

//   product
//     .findAll({
//       where: {
//         id: catalogId,
//       },
//     })
//     .then((data) => console.log({ data }))
//     .catch((err) => console.log(err));

//   res.send("products test");
// });
// get all products
router.get("/products", async (req: Request, res: Response) => {
  const allProducts = await product.findAll().catch((e) => []);

  res.json(allProducts);
});

//POST
router.post("/catalogs/product/", async (req: Request, res: Response) => {
  const { name, description, image } = req.body;

  try {
    await product.findOrCreate({
      where: {
        name,
        description,
        image,
        created_at: new Date(),
      },
    });
  } catch (err) {
    res.status(503).send(err);
  }

  const created = await product.findAll();
  res.status(200).json(created);
});
// DELETE
router.get("/catalogs/product/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currentProduct: any = await product.findByPk(id);
    const productName = currentProduct?.name;

    await currentProduct?.destroy();
    res.json(`${productName} deleted successfully `);
  } catch (err) {
    res.send(err);
  }
});

// CARGHAR DATOS EN DB
async function insertData(product: any) {
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
        },
      });
    }
  }
}
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
export default router;
