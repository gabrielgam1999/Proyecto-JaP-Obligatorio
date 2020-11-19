const ORDER_ASC_BY_PRICE = "Precio_Mas_Alto";
const ORDER_DESC_BY_PRICE = "Precio_Mas_Bajo";
const ORDER_BY_DESC_REL = "Relevancia";
const buscador = document.querySelector("#buscador");
const btnSearch = document.querySelector("#btnSearch");
var currentProductArray = [];
var currentSortCriteriaP = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_DESC_REL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductArray.length; i++) {
        let product = currentProductArray[i];

        if (((minPrice == undefined) || (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))) {

            htmlContentToAppend += `
            <div class="col-md-4 col-sm-6">
            <div class="card mb-30"><a class="card-img-tiles" href="#" data-abc="true">
                    <div class="inner">
                        <div class="main-img"><img src="${product.imgSrc}" alt="Product"></div>
                    </div>
                </a>
                <div class="card-body text-center">
                    <h4 class="card-title">${product.name}</h4>
                    <p class="text-muted">${product.description}</p>
                    <a class="btn btn-outline-primary btn-sm" href="product-info.html" data-abc="true">Ver Producto</a>
                </div>
            </div>
        </div>
            `;

        }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteriaP = sortCriteria;

    if (productsArray != undefined) {
        currentProductArray = productsArray;
    }

    currentProductArray = sortProduct(currentSortCriteriaP, currentProductArray);


    showProductList();
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {

        if (resultObj.status === "ok") {

            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);

        }
    });
    document.getElementById("ordenar").addEventListener("change", function () {
        // sortAndShowProducts(ORDER_ASC_BY_PRICE);
        var e = document.getElementById("ordenar");
        var val = e.options[e.selectedIndex].value;
        switch (val) {
            case "1":
                sortAndShowProducts(ORDER_BY_DESC_REL);

                break;
            case "2":
                sortAndShowProducts(ORDER_ASC_BY_PRICE);

                break;
            case "3":
                sortAndShowProducts(ORDER_DESC_BY_PRICE);

                break;
            default:
                sortAndShowProducts(ORDER_ASC_BY_PRICE);

                break;
        }
    });

    document.getElementById("clearRangeFilterPrice").addEventListener("click", function () {
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;

        showProductList();
    });


    document.getElementById("rangeFilterPrice").addEventListener("click", function () {

        minPrice = document.getElementById("rangeFilterPriceMin").value;
        maxPrice = document.getElementById("rangeFilterPriceMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        }
        else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        }
        else {
            maxPrice = undefined;
        }

        showProductList();
    });
    /*  const filtrar = ()=>{
         // console.log(buscador.value);
         const texto = buscador.value.toLowerCase();
         for(let art of product.name){
             let name =art.name.toLowerCase();
             if(name.indexOf(texto) !== -1){

             }
         }
      }
      btnSearch.addEventListener('click',filtrar) */


});

