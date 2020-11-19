var usuario = {};
var arrayUsuario = [];
var nombre;
var apellido;
var correo;
var contraseña;
var edad;
var telefono;
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("btnSingup").addEventListener("click", function () {
        document.getElementById("alertax").innerHTML = `<div class="alert alert-success" role="alert">
        Se ha registrado correctamente en breve sera redireccionado a la pagina de login.
      </div>`
      window.setTimeout( chau, 6000);

      function chau(){
          window.location.href="index.html";
      }
        nombre = document.getElementById("nombre").value;
        apellido = document.getElementById("apellido").value;
        correo = document.getElementById("correo").value;
        contraseña = document.getElementById("contra").value;
        edad = document.getElementById("nacimiento").value;
        telefono = document.getElementById("tel").value;
      
        usuario.userName = nombre;
        usuario.lastName = apellido;
        usuario.correo = correo;
        usuario.password = contraseña;
        usuario.age = edad;
        usuario.tel = telefono;


        arrayUsuario= JSON.stringify(usuario);

        localStorage.setItem('myArray' , arrayUsuario);

     
    });

});