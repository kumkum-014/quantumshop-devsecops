const express = require("express");
const Wishlist = require("../models/Wishlist");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ================= GET WISHLIST =================

router.get("/", protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({
      user: req.user.userId,
    });

    // If wishlist doesn't exist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user.userId,
        products: [],
      });
    }

    res.status(200).json({
      wishlist: wishlist.products,
    });

  } catch (error) {
    console.error("Get Wishlist Error:", error);

    res.status(500).json({
      message: "Failed to fetch wishlist",
    });
  }
});


// ================= ADD TO WISHLIST =================

router.post("/", protect, async (req, res) => {
  try {
    const product = req.body.product;

    if (!product || !product.id) {
      return res.status(400).json({
        message: "Product information is required",
      });
    }

    let wishlist = await Wishlist.findOne({
      user: req.user.userId,
    });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: req.user.userId,
        products: [],
      });
    }

    // Check if product already exists
    const exists = wishlist.products.some(
      (item) => item.productId === product.id
    );

    if (exists) {
      return res.status(200).json({
        message: "Product already in wishlist",
        wishlist: wishlist.products,
      });
    }

    wishlist.products.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      category: product.category,
      rating: product.rating,
    });

    await wishlist.save();

    res.status(201).json({
      message: "Product added to wishlist",
      wishlist: wishlist.products,
    });

  } catch (error) {
    console.error("Add Wishlist Error:", error);

    res.status(500).json({
      message: "Failed to add product to wishlist",
    });
  }
});


// ================= REMOVE FROM WISHLIST =================

router.delete("/:productId", protect, async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    const wishlist = await Wishlist.findOne({
      user: req.user.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (item) => item.productId !== productId
    );

    await wishlist.save();

    res.status(200).json({
      message: "Product removed from wishlist",
      wishlist: wishlist.products,
    });

  } catch (error) {
    console.error("Remove Wishlist Error:", error);

    res.status(500).json({
      message: "Failed to remove product from wishlist",
    });
  }
});


module.exports = router;