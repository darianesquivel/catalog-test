import { Request, Response } from "express";
const router = require("express");

router.get("/", (req: Request, res: Response) => {
  res.send("testinnnnnng");
});
router.get("/second", (req: Request, res: Response) => {
  res.send("second testtt");
});

module.exports = router;
