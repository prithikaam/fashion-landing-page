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
      { $set: { image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600' } }
    );
    await Product.updateOne(
      { name: 'Velvet Wrap Dress' },
      { $set: { image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600' } }
    );
    console.log('Images fixed!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixImages();
