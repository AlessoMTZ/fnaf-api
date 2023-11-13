const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/fnafDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB...'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Definir el esquema del modelo Animatronico
const animatronicoSchema = new mongoose.Schema({
    nombre: String,
    descripcion: String,
    tipo: String
});

// Crear el modelo Animatronico
const Animatronico = mongoose.model('Animatronico', animatronicoSchema);

// Rutas de la API
app.get('/', (req, res) => {
    res.send('Fnaf Api');
});

app.get('/api/animatronicos', async (req, res) => {
    const animatronicos = await Animatronico.find();
    res.send(animatronicos);
});

app.get('/api/animatronicos/:id', async (req, res) => {
    const animatronico = await Animatronico.findById(req.params.id);
    if (!animatronico) return res.status(404).send('Animatronico no encontrado');
    res.send(animatronico);
});

app.post('/api/animatronicos', async (req, res) => {
    const animatronico = new Animatronico({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo
    });

    await animatronico.save();
    res.send(animatronico);
});

app.delete('/api/animatronicos/:id', async (req, res) => {
    const animatronico = await Animatronico.findByIdAndRemove(req.params.id);
    if (!animatronico) return res.status(404).send('Animatronico no encontrado');
    res.send(animatronico);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));
