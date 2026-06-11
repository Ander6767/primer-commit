console.log("Iniciando servidor...");

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

console.log("MONGO_URI existe:", !!process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("✅ Conexión exitosa a MongoDB Atlas");
})
.catch(err => {
    console.error("❌ Error completo:");
    console.error(err);
});