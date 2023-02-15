import { Request, Response, Router } from "express";

const router = Router();

router.get("/catalogs", (req: Request, res: Response) => {
  res.send("testinnnnnng");
});

router.get("/catalogs/:productId", (req: Request, res: Response) => {
  res.send("second testtt");
});

router.delete("/catalogs/product/", (req: Request, res: Response) => {});
router.post("/catalogs/product/", (req: Request, res: Response) => {});
// update

router.put("/catalogs/product/", (req: Request, res: Response) => {});
export default router;
