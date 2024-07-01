/**
 * Objetivo: como manejar la subida de uno o varios archivos en una aplicacion
 * con el middleware "multer"
 * 1- Creamos el módulo o archivo multerConfig.js
 * 2- npm init -y. Configuramos el script con --watch
 * 3- npm intall multer --save
 * 4- npm i express
 * 5- Codificamos el server.js
 * 6- Codificamos el modulo createDir.js
 * 7- Configuramos el modulo multerConfig.js
 * 8- Crear la carpeta /uploads
 * 9- Realizamos pruebas con postman
 */

// 1- Importamos los modulos necesarios
const express = require("express");

// 2- Importamos modulo multeConfig.js
const upload = require("./multeConfig");

// 3- Importamos el modulo para crear la carpeta Uploads
const createDir = require("./createDir");

// 4- Configuramos el server, creamos instancia de express
const app = express();

// 5- Declaramos el puerto
const PORT = 3000;

// 6- Activamos el modulo createDir, para que sea quien verifique, antes de guardar el archivo
// que la carpeta exista y sino que la cree.
createDir();

// 7- Definimos las rutas principales mediante app post
app.post("/upload", upload.single("archivo"), (req, res) => {

    // Si algo sale mal
    if (!req.file) {
        // Si no hay ningún archivo subido, devuelve un error.
        return res.status(400).send("Error al subir el archivo.");
    }
    // Si el archivo se ha subido correctamente, devuelve un mensaje de éxito.
    res.status(200).send("Archivo subido exitosamente.");
});

// 8- Para recibir mas de un archivo 
app.post("/uploads", upload.array("archivos", 10), (req, res) => {
    //Si algo sale mal
    if (!req.files) {
        // Si no hay ningún archivo subido, devuelve un error.
        return res.status(400).send("Error al subir los archivos.");
    }
    // Si el archivo se ha subido correctamente, devuelve un mensaje de éxito.
    res.status(200).send("Archivos subidos exitosamente.");
});

// Inicializamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando puerto: ${PORT}`);
});

