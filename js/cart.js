
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
            CostoHTML.innerHTML =  x.count * x.unitCost;
            CantidadHTML.innerHTML = `<input id="cantidad" class="form-control count" type="number" style="width:60px" value="` + x.count + `">`;
            ImagenHTML.innerHTML = `<img src=" ` + x.src + ` " alt="" > `;


            document.getElementById("cantidad").addEventListener("change", function () {
                let canti = document.getElementById("cantidad").value;
                
                CostoHTML.innerHTML =   canti * x.unitCost;

                var envio = document.getElementById("carroEnvio");
                var envioValue = parseInt(envio.innerHTML);
                var subtotal = document.getElementById("carroTotal");
                var subtotalValue = parseInt(subtotal.innerHTML);
    
                console.log(envioValue);
                console.log(subtotalValue);
                TotalisimoHTML.innerHTML =  envioValue + subtotalValue;
            });

            var envio = document.getElementById("carroEnvio");
            var envioValue = parseInt(envio.innerHTML);
            var subtotal = document.getElementById("carroTotal");
            var subtotalValue = parseInt(subtotal.innerHTML);

            console.log(envioValue);
            console.log(subtotalValue);
            TotalisimoHTML.innerHTML =  envioValue + subtotalValue;

        }
        document.getElementById("redirect").addEventListener("click",function(){
            window.location.href ="products.html"
        });
    });
});