function loadCustomers() {

    

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        if (document.querySelector(".order-table").style.display == "") {
            document.querySelector(".order-table").style.display = "none";
        }
    
        var myArray = JSON.parse(this.responseText);

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
    };

    xhttp.open("GET", "https://serene-eyrie-60807.herokuapp.com/customers", true);
    xhttp.send();
  };

  function loadOrders() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        if (document.querySelector(".customer-table").style.display == "") {
            document.querySelector(".customer-table").style.display = "none";
        }

        var myArray = JSON.parse(this.responseText);

        if (document.querySelector(".order-table").style.display == "none" && document.querySelector(".order-table").id == "") {
            for (var i = 0; i < myArray.length; i++) {    
                document.querySelector(".main-title").innerHTML = "Orders"
                document.querySelector(".customerID").innerHTML = myArray[i].customerID;
                document.querySelector(".amount").innerHTML = myArray[i].amount;
                document.querySelector(".paid").innerHTML = myArray[i].isPaid;
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
    };

    xhttp.open("GET", "https://serene-eyrie-60807.herokuapp.com/orders", true);
    xhttp.send();
  };


  function goHome() {
    location.reload();
    document.querySelector(".table").style.display = "none";
  };
