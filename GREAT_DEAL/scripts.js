function viewInfoLabel(name, description, img, cost, mass) {
    e = document.getElementById("infoWindow");
    dn = document.getElementById("dishName");
    dd = document.getElementById("dishDescription");
    dc = document.getElementById("dishCost");
    di = document.getElementById("dishImg");
    dm = document.getElementById("dishMass");
    dn.innerHTML = name;
    dd.innerHTML = description;
    dc.innerHTML = cost+"₽";
    dm.innerHTML = mass+" гр.";

    di.src = img;
    e.style.zIndex = "1000000";
}


function plusFromInfo(){
    dc = parseInt(document.getElementById("dishCost").innerHTML.slice(0, -1));
    n = parseInt(document.getElementById("numC").innerHTML);
    document.getElementById("AddCostN").innerHTML = "+"+(dc*(n+1));
    document.getElementById("numC").innerHTML = n+1;

}
function minusFromInfo(){
    dc = parseInt(document.getElementById("dishCost").innerHTML.slice(0, -1));
    n = parseInt(document.getElementById("numC").innerHTML);
    if ((n-1) >= 0) {
        document.getElementById("numC").innerHTML = n-1;
    }
    if ((n-1) > 0) {
        document.getElementById("AddCostN").innerHTML = "+"+(dc*(n-1))+"₽";
    } else {
        document.getElementById("AddCostN").innerHTML = "";
    }


}
function addToCart() {

}
function addToCart(no, cost, n) {
}

function closeInfoLabel(){
    e = document.getElementById("infoWindow");
    e.style.zIndex = "-1000000";
}
closeInfoLabel();


