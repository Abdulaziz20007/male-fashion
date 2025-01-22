const router = require("express").Router();
const { createViewPage } = require("../helpers/create_view_page");
const { errorHandler } = require("../helpers/error_handler");
const Product = require("../schema/Product");



router.get("/index", async (req, res) => {
  res.redirect("/");
});
router.get("/index.html", async (req, res) => {
  res.redirect("/");
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.render(createViewPage("index"), { products, title: "Home" });
});

router.get("/shop/:id", async (req, res) => {
  try {
    const id = req.params.id
   
    const  product = await Product.findById(id)

    res.render(createViewPage("shop-details"), {product, title: "Shop Details" });
    
  } catch (error) {
    errorHandler(error, res)
  }
});
router.get("/shop", async (req, res) => {
  try {
    const products = await Product.find();
    res.render(createViewPage("shop"), { products, title: "Shop" });
  } catch (error) {
    errorHandler(err, res)
  }
});
router.get("/about", async (req, res) => {
  res.render(createViewPage("about"), { title: "About" });
});

router.get("/shopping-cart", async (req, res) => {
  res.render(createViewPage("shopping-cart"), { title: "Shopping Cart" });
});
router.get("/checkout", async (req, res) => {
  res.render(createViewPage("checkout"), { title: "Checkout" });
});
router.get("/contact", async (req, res) => {
  res.render(createViewPage("contact"), { title: "Contact" });
});
router.get("/blog", async (req, res) => {
  res.render(createViewPage("blog"), { title: "Blog" });
});
router.get("/blog-details", async (req, res) => {
  res.render(createViewPage("blog-details"), { title: "Blog Details" });
});
router.get("/shop", async (req, res) => {
  res.render(createViewPage("shop"), { title: "Shop" });
});

router.get("/shopping-cart", async (req, res) => {
  res.render(createViewPage("shopping-cart"), { title: "Shopping Cart" });
});
router.get("/checkout", async (req, res) => {
  res.render(createViewPage("checkout"), { title: "Checkout" });
});
router.get("/404", async (req, res) => {
  res.render(createViewPage("404"), { title: "404" });
});
router.get("*", async (req, res) => {
  res.redirect("/404");
});

module.exports = router;
