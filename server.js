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

// Esquema
const ProductoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    existencia: Number
});

const Producto = mongoose.model('Producto', ProductoSchema);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

// Obtener productos
app.get('/productos', async (req, res) => {
    const productos = await Producto.find();
    res.json(productos);
});

// Guardar producto
app.post('/productos', async (req, res) => {
    const nuevoProducto = new Producto(req.body);
    await nuevoProducto.save();
    res.json({
        mensaje: "Producto registrado",
        nuevoProducto
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});