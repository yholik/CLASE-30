/*
  * Módulo que valida y/O crea la carpeta de subida
  */

// 1- Importamos modulos 
const fs = require("fs");
const path = require("path");

// 2- Declarmos la funcion createDir(). Verifica si la carpeta 'uploads' existe, y si no, créala.
function createDir() {
    const uploadsDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir);
    }
}
// existsSync(): Es un método del módulo fs que verifica si un archivo o directorio existe
// uploadsDir: Es la ruta al directorio
// mkdirSync(): Es otro método del módulo fs que crea un directorio de manera sincrónica.

// 3- Exportamos el modulo para utilizarlo en server.js
module.exports = createDir;

