var hoy = new Date();
var fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
var FechayHora = fecha + ' ' + hora;

var ProductRating = {};
var RelatedProductArray = [];

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        var productInfo = {};
        if (resultObj.status === "ok") {
            productInfo = resultObj.data;
           
            let ProductNameHTML = document.getElementById("ProductName");
            let ProductCostHTML = document.getElementById("cost");
            let ProductDescriptionHTML = document.getElementById("ProductDescription");
            let productInfoCountHTML = document.getElementById("stock");
            let productCriteriaInfoHTML = document.getElementById("category");

            ProductNameHTML.innerHTML = productInfo.name;
            ProductCostHTML.innerHTML = productInfo.cost + ` $ ` + productInfo.currency;
            ProductDescriptionHTML.innerHTML = productInfo.description;
            productInfoCountHTML.innerHTML = ` Vendidos: ` + productInfo.soldCount;
            productCriteriaInfoHTML.innerHTML = ` Categoria: ` + productInfo.category;

        }
        getJSONData(PRODUCTS_URL).then(function (resultObj) {
            if (resultObj.status === "ok") {
                RelatedProductArray = resultObj.data;
                let htmlContent = "";
                let relatedIndice = productInfo.relatedProducts;
               
                for (i = 0; i < relatedIndice.length; i++) {
                    let indice = relatedIndice[i];

                    let prueba = RelatedProductArray[indice];

                    htmlContent += `
                    
                    
                    <a href="product-info.html" >
                    <div class="row row-flex col-md-4">
                    <div class="card" style="width: 10rem;">
                    <img class="card-img-top" src="` + prueba.imgSrc + `" alt="Card image cap"></a>
                    <div class="card-body">
                      <h5 class="card-title">`+ prueba.name + `</h5>
                      <p class="card-text">$ `+ prueba.cost + `   ` + prueba.currency + `</p>
                      
                    </div>
                  </div>
                 </div>
                 
                  `;


                    document.getElementById("relatedProduct").innerHTML = htmlContent;
                }
            }
        });
        
        
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            ProductRating = resultObj.data;
            let htmlContentToAppend = "";
            for (let i = 0; i < ProductRating.length; i++) {
                var estrella = `<span id="starz" class="fa fa-star checked"></span>`;
                var notEstrella = `<span id="starz" class="fa fa-star"></span>`;
                let rating = ProductRating[i];
                htmlContentToAppend += `
               
                    <div class="row">
                        
                        <div class="col">
                        
                            <div class="d-flex w-100 justify-content-between">
                            
                                <span class="mb-1 d-flex flex-column ml-1 comment-profile"><strong>`+ rating.user + `  </strong><span class="derecha">` + estrella.repeat(rating.score) + notEstrella.repeat(5 - rating.score) + `</span>  </span> 
                                
                                <small  class="text-muted">` + rating.dateTime + ` </small>
                            </div>
                            
                            <p class="mb-1">` + rating.description + `</p>
                        </div>
                    </div>
                </a>
                `;
            }
            document.getElementById("section").innerHTML = htmlContentToAppend;

        }
    });
   
document.getElementById("btnComment").addEventListener("click", function (e) {
    var http = new XMLHttpRequest();
    var url = "https://aalza.pythonanywhere.com/saveJSON";
    
    var e = document.getElementById("nroStar");
    var valor = e.options[e.selectedIndex].value;
    var description = document.getElementById('wombo').value;
    var usuario = localStorage.getItem("username");
    var fcha = FechayHora;
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   

    http.onreadystatechange = function () {
        if (http.readyState == 4 && http.status == 200) {
            //aqui obtienes la respuesta de tu peticion
            alert(http.responseText);
        }
    }
    http.send(JSON.stringify({ score: valor, description: description,user: usuario,dateTime: fcha }));
});
});
