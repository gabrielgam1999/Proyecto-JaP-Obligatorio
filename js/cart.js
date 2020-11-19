let Percentage = 0.13;

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        var cartProduct = {};

        if (resultObj.status === "ok") {
            cartProduct = resultObj.data;
            let x = cartProduct.articles[0];



            let TotalisimoHTML = document.getElementById("carroTotalFinal");
            let MonedaHTML = document.getElementById("carroMoneda");
            let NombreHTML = document.getElementById("carroNombre");
            let CostoHTML = document.getElementById("carroTotal");
            let Costo2HTML = document.getElementById("carroPrecio");
            let CantidadHTML = document.getElementById("carroCantidad");
            let ImagenHTML = document.getElementById("carroImagen");
            
            NombreHTML.innerHTML = x.name;
            MonedaHTML.innerHTML = x.currency;
            Costo2HTML.innerHTML = '$' + x.unitCost;
            CostoHTML.innerHTML =  (x.count * x.unitCost);
            CantidadHTML.innerHTML = `<input id="cantidad" class="form-control count" type="number"  min="0" style="width:60px" value="` + x.count + `">`;
            ImagenHTML.innerHTML = `<img src=" ` + x.src + ` " alt="" > `;
        
            function EnviosToLocos(){
             
                let canti = document.getElementById("cantidad").value;
                 let unit = canti * x.unitCost;
                 let subTotalCostHTML = document.getElementById("carroEnvio");
             
              
                 let totalCostToShow = (Math.round(unit * Percentage * 100) / 100);
             
                 
                 subTotalCostHTML.innerHTML = totalCostToShow;
             }
            
           
            document.getElementById("cantidad").addEventListener("change", function () {
                let canti = document.getElementById("cantidad").value;
                if ( canti < 1 ) {
                    alert("La cantidad tiene que ser mayor a 0") //validacion para que la cantidad de productos no sea menos de 1 
                    document.getElementById("checkout").disabled = true;
                }else {
                    document.getElementById("checkout").disabled = false;
    
                }
                CostoHTML.innerHTML =    (canti * x.unitCost);

            
                
         

            });

            document.getElementById("premium").addEventListener("change", function(){
                Percentage = 0.15;
                EnviosToLocos();
                let envioFinal = document.getElementById("carroEnvio");
                let valueEnvio = parseInt(envioFinal.innerHTML);
                var subtotal = document.getElementById("carroTotal");
                var subtotalValue = parseInt(subtotal.innerHTML);
    
                
                TotalisimoHTML.innerHTML =  valueEnvio+ subtotalValue;
            });
            document.getElementById("express").addEventListener("change", function(){
                Percentage = 0.07;
                EnviosToLocos();
                let envioFinal = document.getElementById("carroEnvio");
                let valueEnvio = parseInt(envioFinal.innerHTML);
                var subtotal = document.getElementById("carroTotal");
                var subtotalValue = parseInt(subtotal.innerHTML);
    
                
                TotalisimoHTML.innerHTML =  valueEnvio+ subtotalValue;
            });
            document.getElementById("standard").addEventListener("change", function(){
               Percentage = 0.05;
               EnviosToLocos();
               let envioFinal = document.getElementById("carroEnvio");
               let valueEnvio = parseInt(envioFinal.innerHTML);
               var subtotal = document.getElementById("carroTotal");
               var subtotalValue = parseInt(subtotal.innerHTML);
   
               
               TotalisimoHTML.innerHTML =  valueEnvio+ subtotalValue;
           }); 

        }
        document.getElementById("redirect").addEventListener("click",function(){
            window.location.href ="products.html"
        });
        //validacion para los tipo de envios
        document.getElementById("checkout").addEventListener("click",function(event){
            var pre =document.getElementById("premium").checked == false;
            var  exp =document.getElementById("express").checked == false;
            var stan =document.getElementById("standard").checked == false;
         if (pre ^ exp ^ stan ){
             alert("Por favor elegir un tipo de envio antes de finalizar la compra");
             event.stopPropagation();
         }
         
        
         
        });
       
    });
 
    
});

