
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    var arrayProfile = localStorage.getItem('myArray');
  arrayProfile = JSON.parse(arrayProfile);
  
  var nombre1 = arrayProfile.userName;
  var nombre2 = arrayProfile.lastName;
  var nombreLoco = `${nombre1} ${nombre2}`;

  document.getElementById("nameProfile").innerHTML = arrayProfile.userName;
  document.getElementById("lastnameProfile").innerHTML = arrayProfile.lastName;
  document.getElementById("phoneProfile").innerHTML = arrayProfile.tel;
  document.getElementById("mailProfile").innerHTML = arrayProfile.correo;
  document.getElementById("mailProfile2").innerHTML = arrayProfile.correo;
  document.getElementById("dateProfile").innerHTML = arrayProfile.age;
  document.getElementById("nameProfile2").innerHTML = nombreLoco;
    document.getElementById("jaja").addEventListener("click", function (e) {
        var avatar = document.getElementById("funcionaPlis").value;

        var avatr = {};
        var arrayAvatr = [];
        avatr.img = avatar
        arrayAvatr = JSON.stringify(avatr);
        localStorage.setItem('avatar', arrayAvatr);


    });
    var arrayProfileAvatar = localStorage.getItem('avatar');
    arrayProfileAvatar = JSON.parse(arrayProfileAvatar);
    document.getElementById("Avatar").src = arrayProfileAvatar.img;

    document.getElementById("editar").addEventListener("click", function (e) {
        var arrayProfile = localStorage.getItem('myArray');
        arrayProfile = JSON.parse(arrayProfile);

        var name = document.getElementById("nameP");
        var lastname = document.getElementById("lastnameP");
        var mail = document.getElementById("mailP");
        var phone = document.getElementById("cellP");
        var birthday = document.getElementById("dateP");

        name.value = arrayProfile.userName;
        lastname.value = arrayProfile.lastName;
        mail.value = arrayProfile.correo;
        phone.value = arrayProfile.tel;
        birthday.value = arrayProfile.age;

    });
    document.getElementById("btnSaveNewProfile").addEventListener("click", function (e) {
        var usuario = {};
        var arrayUsuario= [];
        var nombre = document.getElementById("nameP").value;
        var apellido = document.getElementById("lastnameP").value;
        var correo = document.getElementById("mailP").value;

        var edad = document.getElementById("dateP").value;
        var telefono = document.getElementById("cellP").value;

        usuario.userName = nombre;
        usuario.lastName = apellido;
        usuario.correo = correo;
        
        usuario.age = edad;
        usuario.tel = telefono;


        arrayUsuario = JSON.stringify(usuario);

        localStorage.setItem('myArray', arrayUsuario);

        location.reload();

        alert("Datos Actualizados correctamente")
    });
});