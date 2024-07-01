/**
 * MULTER es un middleware de Node.js 
 * para manejar la subida de archivos.
 * En general se usa con express y 
 * facilita la gestión de archivos recibidos 
 * en peticiones HTTP.
 */


// 1- Importamos el modulo multer
const multer = require("multer");

// 2- Importamos el modulo path
const path = require("path");

// 3- Configuracion de almacenamiento en local
// diskStorage: le pasamos un objeto y en ese mismo le decimos destino y nombre del archivo que va a guardar
const storage = multer.diskStorage({
    //Configuramos los atributos del objeto
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// 4- Crea una instancia de 'multer' con la configuración de almacenamiento definida.
// Configura la instancia de Multer con opciones adicionales. 
const upload = multer({
    // storage: es el almacenamiento configurado que hemos definido previamente.
    storage: storage,
    // fileFilter: configuracion de archivo
    fileFilter: (req, file, cb) => {
        // Define los tipos de archivos permitidos usando una expresión regular.
        const filetypes = /jpeg|jpg|png|bmp|gif/;
        // Verifica si el tipo MIME del archivo es uno de los permitidos.
        const mimetype = filetypes.test(file.mimetype);
        // Verifica si la extensión del archivo es una de las permitidas.
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        // Si ambos, tipo MIME y extensión del archivo, son permitidos, acepta el archivo.
        if (mimetype && extname) {
            return cb(null, true);
          } else {
            // Si el archivo no es permitido, devuelve un error.
            cb('Error: Tipo de archivo no soportado');
          }
    },
    // limits: limite de tamaño del archivo en bytes
    limits: {fileSize: 1000000}
});

// 5- Exportamos el modulo
module.exports = upload;