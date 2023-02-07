const express = require("express");
const handlebarsConfig = require("./handlebars/config.Handlebars");
const router = require("./routes/Router");
const app = express();
//const __dirname = require("./utils.js");
const { Server } = require("socket.io");


const PORT = 8080;
const IP = "192.168.1.35";

app.use(express.static(__dirname + "/public"));

handlebarsConfig(app);
router(app);


const httpServer = app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
});

const socketServer = new Server(httpServer);

const messages = [];

socketServer.on("connection", socket => {
    
    console.log("Nuevo cliente conectado");
    
    
    socket.emit("mensajeGrupal", messages);

    
    socket.on("message", (data) => {
        console.log(data);
        messages.push(data);
        socketServer.emit("mensajeGrupal", messages);
    });
    socket.on("enviarArchivo", (data) => {
        //console.log(data);
        let img = `<img src=${data} style = "width: 10rem; heigth: 20rem;">`
        messages.push(img);
        socketServer.emit("archivoRecibido", messages);
    });

    socket.on("disconnect", () => {console.log("Cliente desconectado: " + socket.id)})
});


