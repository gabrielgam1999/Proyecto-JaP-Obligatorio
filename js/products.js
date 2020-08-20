const ORDER_ASC_BY_PRICE = "Precio_Mas_Alto";
const ORDER_DESC_BY_PRICE = "Precio_Mas_Bajo";
const ORDER_BY_DESC_REL = "Relevancia";
var currentProductArray = [];
var currentSortCriteriaP = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function sortProduct(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_DESC_REL){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
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
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(product.cost) <= maxPrice))){

        htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +` - `+ product.currency +`  `+ product.cost +`</h4>
                            
                            <small class="text-muted">` + product.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `;

            }
        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteriaP = sortCriteria;

    if(productsArray != undefined){
        currentProductArray = productsArray;
    }

    currentProductArray = sortProduct(currentSortCriteriaP, currentProductArray);

    
    showProductList();
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
            //showProductList();
        }
    });
    document.getElementById("Precio_Mas_Alto").addEventListener("change", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("Precio_Mas_Bajo").addEventListener("change", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("Relevancia").addEventListener("change", function(){
        sortAndShowProducts(ORDER_BY_DESC_REL);
    });
        
        document.getElementById("clearRangeFilterPrice").addEventListener("click", function(){
            document.getElementById("rangeFilterPriceMin").value = "";
            document.getElementById("rangeFilterPriceMax").value = "";
    
            minPrice = undefined;
            maxPrice = undefined;
    
            showProductList();
        });
       
    
        document.getElementById("rangeFilterPrice").addEventListener("click", function(){
            
            minPrice = document.getElementById("rangeFilterPriceMin").value;
            maxPrice = document.getElementById("rangeFilterPriceMax").value;
    
            if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0){
                minPrice = parseInt(minPrice);
            }
            else{
                minPrice = undefined;
            }
    
            if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0){
                maxPrice = parseInt(maxPrice);
            }
            else{
                maxPrice = undefined;
            }
    
            showProductList();
        });
    });

