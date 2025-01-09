const router = require("express").Router();
const { createViewPage } = require("../helpers/create_view_page");
const Product = require("../schema/Product");

router.get("/index", async (req, res) => {
  res.redirect("/");
});
router.get("/index.html", async (req, res) => {
  res.redirect("/");
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.render(createViewPage("index"), { products });
});

router.get("/shop", async (req, res) => {
  const products = await Product.find();
  res.render(createViewPage("shop"), { products });
});
router.get("/about", async (req, res) => {
  res.render(createViewPage("about"));
});
router.get("/shop-details", async (req, res) => {
  res.render(createViewPage("shop-details"));
});
router.get("/shopping-cart", async (req, res) => {
  res.render(createViewPage("shopping-cart"));
});
router.get("/checkout", async (req, res) => {
  res.render(createViewPage("checkout"));
});
router.get("/contact", async (req, res) => {
  res.render(createViewPage("contact"));
});
router.get("/blog", async (req, res) => {
  res.render(createViewPage("blog"));
});
router.get("/blog-details", async (req, res) => {
  res.render(createViewPage("blog-details"));
});

module.exports = router;


