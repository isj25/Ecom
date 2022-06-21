import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Order from "./models/orderModel.js";
import Product from "./models/productModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
//seeding is adding initial data
const importData = async () => {
  try {
    //deleting already existing junk
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminid = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminid };
    });

    await Product.insertMany(sampleProducts);
    console.log("data imported ".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error} occured`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    //deleting already existing junk
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    console.log("data destroyed ".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error} occured`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
