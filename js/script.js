function requestArrayByUrl(url, callback) {
    var xhttp = new XMLHttpRequest();

    var myArray;

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            myArray = JSON.parse(this.responseText);

            callback(myArray)
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
}

function requestCustomers(callback) {
    requestArrayByUrl("https://serene-eyrie-60807.herokuapp.com/customers", callback);
}

function requestOrders(callback) {
    requestArrayByUrl("https://serene-eyrie-60807.herokuapp.com/orders", callback);
}

function requestProducts(callback) {
    requestArrayByUrl("https://serene-eyrie-60807.herokuapp.com/products", callback);
}

function loadCustomers() {
    requestCustomers(initTableCustomers)
}

function initTableCustomers(myArray) {
    hideAllLists();

    if (document.querySelector(".customer-table").style.display == "none" && document.querySelector(".customer-table").id == "") {

        for (var i = 0; i < myArray.length; i++) {
            document.querySelector(".main-title").innerHTML = "Customers"
            document.querySelector(".businessName").innerHTML = myArray[i].businessName;
            document.querySelector(".address").innerHTML = myArray[i].address;
            document.querySelector(".phone").innerHTML = myArray[i].telephone;
            document.querySelector(".email").innerHTML = myArray[i].email;
            var newRow = document.querySelector(".customer").cloneNode(true);
            newRow.style.display = "";
            document.querySelector(".customerTable").appendChild(newRow);
            document.querySelector(".customer-table").style.display = "";
            document.querySelector(".customer-table").id = "full";
        }

    } else {
        document.querySelector(".main-title").innerHTML = "Customers";
        document.querySelector(".customer-table").style.display = "";
        console.log("already there");
    }
}

var myArrayCustomers = null, myArrayOrders = null, myArrayProducts = null;

function setCustomersArray(myArray) {
    myArrayCustomers = myArray;
    initTableOrders()
}

function setOrdersArray(myArray) {
    myArrayOrders = myArray;
    initTableOrders()
}

function setProductsArray(myArray) {
    myArrayProducts = myArray;
    initTableOrders()
}

function initTableOrders() {
    if (myArrayCustomers != null && myArrayOrders != null && myArrayProducts != null) {

        hideAllLists();

        if (document.querySelector(".order-table").style.display == "none" && document.querySelector(".order-table").id == "") {
            for (var i = 0; i < myArrayOrders.length; i++) {
                document.querySelector(".main-title").innerHTML = "Orders"
                for (var j = 0; j < myArrayCustomers.length; j++) {
                    if (myArrayOrders[i].customerID == myArrayCustomers[j]._id) {
                        document.querySelector(".customerID").innerHTML = myArrayCustomers[j].businessName;
                        break
                    }
                }
                for (var j = 0; j < myArrayProducts.length; j++) {
                    if (myArrayOrders[i].product == myArrayProducts[j]._id) {
                        document.querySelector(".productID").innerHTML = myArrayProducts[j].productName;
                        break
                    }
                }
                document.querySelector(".amount").innerHTML = myArrayOrders[i].amount;
                document.querySelector(".paid").innerHTML = myArrayOrders[i].isPaid;
                var newRow = document.querySelector(".order").cloneNode(true);
                newRow.style.display = "";
                document.querySelector(".orderTable").appendChild(newRow);
                document.querySelector(".order-table").style.display = "";
                document.querySelector(".order-table").id = "full";
            }
        } else {
            document.querySelector(".main-title").innerHTML = "Orders";
            document.querySelector(".order-table").style.display = "";
            console.log("already there")
        }
    }
}

function loadOrders() {
    requestCustomers(setCustomersArray);
    requestProducts(setProductsArray);
    requestOrders(setOrdersArray)
}

function loadProducts() {
    requestProducts(initTableProducts)
}

function initTableProducts(myArray) {
    hideAllLists();

    if (document.querySelector(".product-table").style.display == "none" && document.querySelector(".product-table").id == "") {
        for (var i = 0; i < myArray.length; i++) {
            document.querySelector(".main-title").innerHTML = "Products"
            document.querySelector(".productName").innerHTML = myArray[i].productName;
            document.querySelector(".price").innerHTML = myArray[i].price;
            var newRow = document.querySelector(".product").cloneNode(true);
            newRow.style.display = "";
            document.querySelector(".productTable").appendChild(newRow);
            document.querySelector(".product-table").style.display = "";
            document.querySelector(".product-table").id = "full";
        }
    } else {
        document.querySelector(".main-title").innerHTML = "Products";
        document.querySelector(".product-table").style.display = "";
        console.log("already there")
    }
}

function hideAllLists() {
    if (document.querySelector(".order-table") != null && document.querySelector(".order-table").style.display == "") {
        document.querySelector(".order-table").style.display = "none";
    }
    if (document.querySelector(".customer-table") != null && document.querySelector(".customer-table").style.display == "") {
        document.querySelector(".customer-table").style.display = "none";
    }
    if (document.querySelector(".product-table") != null && document.querySelector(".product-table").style.display == "") {
        document.querySelector(".product-table").style.display = "none";
    }
}

function goHome() {
    location.reload();
    document.querySelector(".table").style.display = "none";
}

function loadOrderDetails() {
    var xhttp = new XMLHttpRequest();
    var productRequest = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (document.querySelector("#selectCustomer").innerHTML.length == 0) {

                var customerArray = JSON.parse(this.responseText);
                for (var i = 0; i < customerArray.length; i++) {
                    var option = document.createElement("option");
                    option.innerHTML = customerArray[i].businessName + ", " + customerArray[i].address;
                    document.querySelector("#selectCustomer").appendChild(option);
                }
            } else {
                console.log("customers already loaded");
            }
        }
    };

    productRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (document.querySelector("#selectProduct").innerHTML.length == 0) {
                var productArray = JSON.parse(this.responseText);
                for (var i = 0; i < productArray.length; i++) {
                    var option = document.createElement("option")
                    option.innerHTML = productArray[i].productName
                    document.querySelector("#selectProduct").appendChild(option);
                }
            } else {
                console.log("products already loaded");
            }
        }
    };

    xhttp.open("GET", "https://serene-eyrie-60807.herokuapp.com/customers", true);
    productRequest.open("GET", "https://serene-eyrie-60807.herokuapp.com/products", true)

    xhttp.send();
    productRequest.send();
}