const socket = io();
//socket.emit("message", "¡Hola desde socket");

/*socket.on("mes", data => {
    console.log(data);
})*/
//console.log("funciona");

const res = document.getElementById("res");
const user = document.getElementById("user");
const text = document.getElementById("text");
const enviar = document.getElementById("enviarImg");
const archivo = document.getElementById("archivoBtn");
const file = document.getElementById("file");





document.addEventListener("keydown", (e) => {
    socket.id = user.value;
    //console.log(e.key);
    
    if(e.key === "Enter"){
        socket.emit("message", `User ${socket.id}: ${text.value}`);
        text.value = "";
    }

});


archivo.addEventListener("click", () =>{
    file.click();


})

enviar.addEventListener("click", () => {
    socket.id = user.value;
    //console.log(e.key);
    
    if(text.value){
        socket.emit("message", `User ${socket.id}: ${text.value}`);
        text.value = "";
    }
    
    if(file.files[0]){

        const reader = new FileReader();
        reader.addEventListener("load", (e) =>{
            socket.emit("enviarArchivo", e.target.result);
            /*let image = document.createElement("img");
            res.appendChild(image)
            image.style.width = "10rem";
            image.style.height = "15rem";
            image.src = data;
            console.log(e.target.result)*/
        })
        
        reader.readAsDataURL(file.files[0]);
        
    }
});

socket.on("mensajeGrupal", data => {
    console.log(data);
    let newMessage = "";
    data.forEach( message => {
        newMessage += message + "</br>";
    })
    res.innerHTML = newMessage;
    
});

socket.on("archivoRecibido", data => {
    console.log(data);
    let newMessage = "";
    data.forEach( message => {
        newMessage += message + "</br>";
    })
    res.innerHTML = newMessage;
    /*let image = document.createElement("img");
    res.appendChild(image)
    image.src = data;
    image.style.width = "10rem";
    image.style.height = "15rem";*/
    file.value = "";
})