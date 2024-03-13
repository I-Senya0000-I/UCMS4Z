function resetContainer() {
    var c = document.getElementById("container")
    c.innerHTML = "";
}

function fill_v2(r) {
    var http = new XMLHttpRequest();
    var url = "/get_dishes";
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            x = JSON.parse(http.responseText);
            console.log(x);
            resetContainer();
            for (var i = 0; i < x.length; i++) {
                fill_element(i, x[i]["name"], x[i]["desc"], x[i]["cost"], x[i]["img"], x[i]["comp"], x[i]["mass"]);
            }
        }
    }
    var params = "?types=" + JSON.stringify(r);
    console.log(params);
    http.open("POST", url+params, true);
    http.send(null);
}




function fill() {
    resetContainer();
    var http = new XMLHttpRequest();
    var url = "/get_dishes";
    http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
            x = JSON.parse(http.responseText);
            console.log(x);

            for (var i = 0; i < x.length; i++) {
                fill_element(i, x[i]["name"], x[i]["desc"], x[i]["cost"], x[i]["img"], x[i]["comp"], x[i]["mass"]);
            }
        }
    }
    r = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var params = "?types=" + JSON.stringify(r);
    console.log(params);
    http.open("POST", url+params, true);
    http.send(null);

}

function fill_element(no, title, desc, cost, ref, comp, mass) {
    var c = document.getElementById("container")
    var img_src = ref


    var h = '<div id="'+no+'" style="height: 450px; width: 400px; background-color: #ffffff; border-radius: 10px; position: absolute; left:' + (10+(410*(Number(no)%3))).toString() + 'px; top: '+ (10+parseInt(Number(no)/3)*460).toString() + 'px">'+
            '<div style="height: 100%; width: 100%; background: var(--color-mediumseagreen); bottom: 0px; position: relative; border-radius: 10px">'+
                '<div style="height: 280px; width: 90%; left: 20px; background: #ffffff; position: relative; align-items: center; display: flex; border-radius: 10px; top: 10px; text-align: center; overflow: hidden">'+
                    '<img src="'+ img_src +'" style="max-width:360px; max-height:280px; width: auto; height: auto;">'+
                '</div>'+
                '<div style="height: 50px; width: 85%; top: 20px; position: relative; border-radius: 10px; margin: auto; margin-bottom: 10px; text-align: left;">'+
                    '<a style="color: #ffffff; width: 100%; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-align: center; overflow-wrap: break-word; font-family: \'Montserrat\', sans-serif;position: absolute;">'+title+'</a></div>'+
                '<div style="height: 20px; width: 85%; top: 20px; position: relative; border-radius: 10px; margin: auto; margin-bottom: 10px; text-align: left;">'+
                    '<a style="color: #ffffff; width: 100%; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; text-align: left; overflow-wrap: break-word; font-size: 25px; font-family: \'Montserrat\', sans-serif;position: absolute;">'+cost+'₽</a></div>'+
                '<div style="height: 20px; width: 40%; right: -190px; top: -10px; position: relative; border-radius: 10px; margin: auto; margin-bottom: 10px; text-align: left;">'+
                    '<a style="color: #ffffff; width: 100%; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; text-align: left; overflow-wrap: break-word; font-size: 20px; font-family: \'Montserrat\', sans-serif;position: absolute;">'+mass+'гр.</a></div>'+
                '<div onclick="goto('+ no +')" style="height: 40px; width: 65%; background: #000000; bottom: 10px; left: 20px; position: absolute; border-radius: 10px; margin: auto; margin-bottom: 10px; text-align: center">'+
                    '<button type="button" style="top: 10px;width: 30px; height: 0px;background-color: var(--color-gray-100); color: var(--color-gray-100); border: none" onclick="change_sp('+no+', -1,'+cost+')"><img src="./menu+/public/minus_button.png" alt="" style="position: relative;width: 24px; height: 24px; right: 0px; top: 5px; cursor: pointer;"></button>'+
                    '<span id="sp' + no + '" style="display: inline-block; width: 30px; font-size: 20px; color:#1a1a1a; background-color:#ffffff">' + 0 + ' </span>'+
                    '<button style="top: 10px;width: 28px; height: 0px;background-color: var(--color-gray-100); color: var(--color-gray-100); border: none" type="button" onclick="change_sp('+no+', +1,'+cost+')"><img src="./menu+/public/plus_button.png" alt="" style="position: relative;width: 24px; height: 24px; left: -6px; top: 5px; cursor: pointer;"></button>'+
                    '<span id="spx'+no+'" style="color:var(--color-white)"> ' + 0 + '₽</span>'+
                '</div>'+
                '<div onclick="AddToCart('+ no +', \''+ title +'\', '+ cost +')" style="height: 40px; width: 40px; background: #000000; bottom: 10px; left: 290px; position: absolute; border-radius: 10px; margin: auto; margin-bottom: 10px; text-align: center"><img src="public/shp-crt.png" style="position: absolute; top: 6px; left: 6px;height:25px; width: 25px; color: #ffffff; filter: invert(100%) sepia(96%) saturate(0%) hue-rotate(0deg) brightness(105%) contrast(100%);"></img></div>'+
                '<div onclick="viewInfoLabel(\''+title+'\',\''+desc+'\',\''+img_src+'\',\''+cost+'\',\''+mass+'\')" style="height: 40px; width: 40px; background: #000000; bottom: 10px; left: 340px; position: absolute; border-radius: 10px; margin: auto; margin-bottom: 10px; text-align: center"><a style="position: absolute; top: 10px; left: 13px; color: #ffffff; font-family: \'Montserrat\', sans-serif;">i+</a></div>'+

                '</div>'+
            '</div>'+
        '</div>';
        c.innerHTML += h;
}


function change_sp(id, value, cost){
    x = document.getElementById('sp'+id);
    r = parseInt(x.innerHTML) + value;
    if (r >= 0) {
        x.innerHTML = parseInt(x.innerHTML) + value;}
    t = document.getElementById('spx'+id);
    t.innerHTML ='  ' + parseInt(x.innerHTML)*cost + '₽';

}


fill();
