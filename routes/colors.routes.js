const { Router } = require("express");
const router = Router();
const colorsModel = require("../models/color");

router.get("/", async (req, res) => {
  try {
    const dataModel = await colorsModel.find();

    let colors = await dataModel.map((item) => ({
      id: item._id,
      name: item.name.replace("-", " "),
      img: item.img,
      material: item.material,
    }));

    res.json(colors);
  } catch (e) {
    res.status(500).json({ message: "its Error, try again!" });
  }
});

module.exports = router;
