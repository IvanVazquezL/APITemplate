require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Directorio público
app.use( express.static('public') );

// Rutas
app.use( '/api/quotes', require('./routes/quotes') );

app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});

app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});