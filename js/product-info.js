var productInfo = {};

function showProductImagesInfo(array) {

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let image = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + image + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productInfoImagesGallery").innerHTML = htmlContentToAppend;
    }
}

       

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfo = resultObj.data;

            let ProductNameHTML  = document.getElementById("ProductName");
            let ProductCostHTML  = document.getElementById("cost");
            let ProductDescriptionHTML = document.getElementById("ProductDescription");
            let productInfoCountHTML = document.getElementById("productCount");
            let productCriteriaInfoHTML = document.getElementById("productCategory");
        
            ProductNameHTML.innerHTML = productInfo.name;
            ProductCostHTML.innerHTML = productInfo.cost;
            ProductDescriptionHTML.innerHTML = productInfo.description;
            productInfoCountHTML.innerHTML = productInfo.soldCount;
            productCriteriaInfoHTML.innerHTML = productInfo.category;

            //Muestro las imagenes en forma de galería
            showProductImagesInfo(productInfo.images);
        }
    });
});