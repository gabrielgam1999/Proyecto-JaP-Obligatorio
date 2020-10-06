
document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        var cartProduct = {};

        if (resultObj.status === "ok") {
            cartProduct = resultObj.data;
            let x = cartProduct.articles[0];
            
            var c = document.getElementById("carroCantidad").children.length;
            console.log(c);
         
          
            let MonedaHTML = document.getElementById("carroMoneda");
             let NombreHTML = document.getElementById("carroNombre");
            let CostoHTML = document.getElementById("carroPrecio");
            let CantidadHTML = document.getElementById("carroCantidad");
            let ImagenHTML = document.getElementById("carroImagen");
           
            NombreHTML.innerHTML = x.name;
            MonedaHTML.innerHTML = x.currency;
            CostoHTML.innerHTML = '$' + x.count* x.unitCost;
            CantidadHTML.innerHTML = `<input id="cantidad" class="form-control count" type="number" width="20px" value="` + x.count + `">`;
            ImagenHTML.innerHTML = `<img src=" ` + x.src + ` " alt="" > ` ;

            let canti = document.getElementById("cantidad").values;
            console.log(canti);

        }
    });
});