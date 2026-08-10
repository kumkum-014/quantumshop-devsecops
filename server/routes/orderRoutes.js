const express = require("express");
const Order = require("../models/Order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();


// ================= CREATE ORDER =================

router.post("/", protect, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Check required data
    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !shippingAddress
    ) {
      return res.status(400).json({
        message: "Order information is incomplete",
      });
    }

    // Create order
    const order = await Order.create({
      user: req.user.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
});


// ================= GET MY ORDERS =================

router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      orders,
    });

  } catch (error) {
    console.error("Get Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});


module.exports = router;