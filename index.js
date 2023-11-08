const express = require('express')
const app = express();

app.use(express.json());

const animatronicos = [
    {
        "id":1,
        "nombre": "Freddy Fazbear",
        "descripcion": "El anfitrión principal de Freddy Fazbear's Pizza.",
        "tipo": "Oso animatrónico",
        
    },
    {
        "id":2,
        "nombre": "Chica",
        "descripcion": "Una gallina animatrónica que canta en el escenario.",
        "tipo": "Animatrónica de ave",
        
    },
    {
        "id":3,
        "nombre": "Foxy",
        "descripcion": "Un pirata animatrónico que acecha en el pasillo.",
        "tipo": "Animatrónico de zorro",
        
    }
];
app.get('/', (req,res) => {
    res.send('Fnaf Api');
})
app.get('/api/animatronicos', (req,res) => {
    res.send(animatronicos);
})
app.get('/api/animatronicos/:id', (req,res) => {
    const animatronico = animatronicos.find(c => c.id === parseInt(req.params.id));
    if(!animatronico) return res.status(404).send('Animatronico no encontrado')
    else res.send(animatronico);
})

app.post('/api/animatronicos', (req,res) => {
    const animatronico = {
        
        id: animatronicos.length + 1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        tipo: req.body.habilidades,
        
    };
    animatronicos.push(animatronico);
    res.send(animatronico);
})
app.delete('/api/animatronicos/:id', (req,res) => {
    const animatronico = animatronicos.find(c => c.id === parseInt(req.params.id));
    if(!animatronico) return res.status(404).send('Animatronico no encontrado')
    
    const index = animatronico.indexOf(animatronico);
    animatronicos.splice(index, 1);
    res.send(animatronico);

});

const port = process.env.port || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));