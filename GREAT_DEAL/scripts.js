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
    document.getElementById("numC").innerHTML = 0;
document.getElementById("AddCostN").innerHTML = "";
    di.src = img;
    e.style.zIndex = "1000005";
}
function closeInfoLabel(){
    e = document.getElementById("infoWindow");
    e.style.zIndex = "-1000000";
}

cur_menu = [];
cart_cnst = new Map();
console.log(cart_cnst);

function cMenuFill() {
    var http = new XMLHttpRequest();
    var url = "/get_dishes";
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            x = JSON.parse(http.responseText);
            console.log(x);
            for (var i = 0; i < x.length; i++) {
                cur_menu.push(x[i])
            }
        }
    }
    r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var params = "?types=" + JSON.stringify(r);
    console.log(params);
    http.open("POST", url+params, true);
    http.send(null);
}
cMenuFill();
console.log("Menu:", cur_menu);

function findByName(name) {
    for (var i = 0; i < cur_menu.length; i++) {
        console.log(cur_menu[i])
        if (cur_menu[i]["name"] == name) {
            return cur_menu[i]
        }
    }
}
function showFromCart(name) {
    x = findByName(name);
    console.log(x);
    viewInfoLabel(x["name"], x["desc"], x["img"], x["cost"], x["mass"]);
    cartUpd();
}
function plusFromInfo(){
    dc = parseInt(document.getElementById("dishCost").innerHTML.slice(0, -1));
    n = parseInt(document.getElementById("numC").innerHTML);
    document.getElementById("AddCostN").innerHTML = "+"+(dc*(n+1))+"₽";
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
    n = parseInt(document.getElementById("numC").innerHTML);
    dn = document.getElementById("dishName").innerHTML.toString();
    dc = Number(document.getElementById("dishCost").innerHTML.toString().slice(0, -1));
    ds = Number(document.getElementById("numC").innerHTML);
    if (cart_cnst.get(dn)) {
        if (ds == 0) {
            cart_cnst.delete(dn);
        } else {
            cart_cnst.set(dn, [dc, cart_cnst.get(dn)[1] + ds]);
        }
    } else {
        cart_cnst.set(dn, [dc, ds]);
    }

}
function AddToCart(no, dn, dc) {
    ds = Number(document.getElementById("sp"+no).innerHTML);
    if (cart_cnst.get(dn)) {
        if (ds == 0) {
            cart_cnst.delete(dn);
        } else {
            cart_cnst.set(dn, [dc, cart_cnst.get(dn)[1] + ds]);
        }
    } else {
        cart_cnst.set(dn, [dc, ds]);
    }

}
function cartUpd() {
    clearCart();
    console.log(cart_cnst);
    table = document.getElementById("table");
    ItSum = document.getElementById("ItSumLbl");
    cnt = 0;
    console.log(cart_cnst.entries());
    for (let [key, value] of cart_cnst.entries()) {
        r = findByName(key);
        console.log(key, r)
        if (value[1] == 0) {
            cart_cnst.delete(key);
            cartUpd();
        }
        table.innerHTML += "<td><div style=\"width: 620px; font-family: var(--font-inter); display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow-wrap: break-word; font-size: 20px; overflow: hidden;\" onclick=\"showFromCart(\'"+key+"\')\">" + key + "</div></td><td>" + '<button type="button" style="top: 10px;width: 30px; height: 0px;background-color: var(--color-gray-100); color: var(--color-gray-100); border: none" onclick="cart_cnst.set(\''+key+'\', [cart_cnst.get(\''+key+'\')[0], cart_cnst.get(\''+key+'\')[1]-1]); cartUpd()"><img src="./menu+/public/minus_button.png" alt="" style="position: relative;width: 24px; height: 24px; right: 0px; top: 5px; cursor: pointer;"></button>' + "<span style=\" font-family: var(--font-inter); font-size: 20px; color:#1a1a1a; background-color:#ffffff\">⠀" + cart_cnst.get(key)[1].toString() + "⠀</span>" + '<button style="top: 10px;width: 28px; height: 0px;background-color: var(--color-gray-100); color: var(--color-gray-100); border: none" type="button" onclick="cart_cnst.set(\''+key+'\', [cart_cnst.get(\''+key+'\')[0], cart_cnst.get(\''+key+'\')[1]+1]); cartUpd()"><img src="./menu+/public/plus_button.png" alt="" style="position: relative;width: 24px; height: 24px; left: -6px; top: 5px; cursor: pointer;"></button>' +"<span style=\" font-family: var(--font-inter); font-size:20px ;color:var(--color-white)\">" +cart_cnst.get(key)[0] * cart_cnst.get(key)[1] + "₽</span>";
        cnt += cart_cnst.get(key)[0]*cart_cnst.get(key)[1]
    };
    table.innerHTML += '</tr>';
            ItSum.innerHTML = "Итого: " + cnt.toString() + " руб.";

}
function clearCart() {document.getElementById("table").innerHTML = '<tr>';}
function closeScInt() {
    r = document.getElementById("scIntCont");
    r.style.zIndex = -1000000;

}
function openDcInt() {
    r = document.getElementById("scIntCont");
    r.style.zIndex = 10000;
    cartUpd();
}

function sendOrder() {
    s = "";
    i = 0;
    for (let [key, value] of cart_cnst.entries()) {
        i += 1
        r = findByName(key);
        s += i.toString() + ") " + r['name'] + " :" + value + " штук\n";

    }
    or_comp = s;
    var tblnum = new XMLHttpRequest();
    tblnum.open("GET", "/table_number", false);
    tblnum.send();
    var table_number = tblnum.responseText;

    var http = new XMLHttpRequest();
    var url = "/make_order";
    var params = "?table_number="+table_number+"&order_comp="+encodeURIComponent(or_comp)+"&order_comment=";
    http.open("POST", url+params, true);
    http.send();
    alert("Ваш заказ отправлен");
    console.log(http.responseText);
    clearCart();
    cart_cnst= new Map();
    cartUpd();
}

closeInfoLabel();