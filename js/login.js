//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
window.addEventListener('load', function() {
});
document.getElementById("btn1").addEventListener("click", function (e) {
    if (document.getElementById("user").value.length != 0 && document.getElementById("pass").value.length != 0) {
        var username = document.getElementById("user");
        localStorage.setItem("username",username.value);
      // document.all("log").innerHTML =  localStorage.getItem("username");
      
    // console.log(localStorage.getItem("username"));
   return location.href = "index.html";
    } else {
        
        if (document.getElementById("user").value.length == 0)
        {
            document.getElementById("user").style.borderColor = 'red'; 
            document.getElementById("user").style.backgroundColor = 'pink';
        } else
        {
            document.getElementById("user").style.removeProperty('border-color'); 
            document.getElementById("user").style.removeProperty('background-color');
        }

        if (document.getElementById("pass").value.length == 0)
        {
            document.getElementById("pass").style.borderColor = 'red';
            document.getElementById("pass").style.backgroundColor = 'pink';
        } else
        {
            document.getElementById("pass").style.removeProperty('border-color'); 
            document.getElementById("pass").style.removeProperty('background-color');
        }
    }
  
});
    

    
