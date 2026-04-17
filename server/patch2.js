const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
require('dotenv').config();
const Product = require('./models/Product');
const connectDB = require('./config/db');

connectDB();

const fixImages = async () => {
  try {
    await Product.updateOne(
      { name: 'Sequined Cocktail Dress' },
      { $set: { image: '/sequined_dress.png' } }
    );
    await Product.updateOne(
      { name: 'Velvet Wrap Dress' },
      { $set: { image: '/velvet_dress.png' } }
    );
    console.log('Images patched!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixImages();
