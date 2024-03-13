#region --IMPORTS--
import json
import pickle

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
import query
import foodDatabase as fdb
import uvicorn
#endregion

disable_test_ui = False
app = FastAPI()
if disable_test_ui:
    app = FastAPI(docs_url=None, redoc_url=None)


#region --HOMEPAGE--
templates = Jinja2Templates(directory="templates")
app.mount("/public", StaticFiles(directory="public"), name="public")
app.mount("/fonts", StaticFiles(directory="fonts"), name="fonts")


@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    data = {
        "page": "Home page"
    }
    return templates.TemplateResponse("index.html", {"request": request, "data": data})
#endregion
#region --BUISNESSLUNCH--
templatesBuisness = Jinja2Templates(directory="buisnessLunch")
app.mount("/buisnessLunch/public", StaticFiles(directory="buisnessLunch/public"), name="buisnessLunch/public")
app.mount("/fonts", StaticFiles(directory="fonts"), name="fonts")
@app.get("/buisnessLunch", response_class=HTMLResponse)
async def read_root(request: Request):
    data = {
        "page": "BuisnessLunch page"
    }
    return templatesBuisness.TemplateResponse("index.html", {"request": request, "data": data})
#endregion
#region --QUERY METHODS--
@app.get("/query")
async def get_query():
    return query.get_query()



@app.post("/make_order")
async def make_odrer(table_number, order_comp, order_comment=""):
    query.add_order(table_number, order_comp, order_comment)
    res = await get_query()
    return "Success!", res


@app.post("/delete_order")
async def delete_order(id):
    query.delete_order(id)
    res = await get_query()
    return "Success!", res


@app.post("/change_status")
async def change_status(id, status):
    query.change_status(id, status)
    res = await get_query()
    return "Success!", res


@app.get("/test_con")
async def test_con():
    return 1

@app.get("/table_number")
async def table_number():
    return 909
#endregion
#region MENU
templatesAddon = Jinja2Templates(directory="GREAT_DEAL")
app.mount("/GREAT_DEAL", StaticFiles(directory="GREAT_DEAL"), name="GREAT_DEAL")
app.mount("/fonts", StaticFiles(directory="fonts"), name="fonts")


@app.get("/additional_ver", response_class=HTMLResponse)
async def read_root(request: Request):
    data = {
        "page": "DEAL!"
    }
    return templatesAddon.TemplateResponse("design_ver2.html", {"request": request, "data": data})



app.mount("/food", StaticFiles(directory="food"), name="food")
app.mount("/menu+/public", StaticFiles(directory="menu+/public"), name="menu+/public")
app.mount("/fonts", StaticFiles(directory="fonts"), name="fonts")


eda = [
        {"id": 0,
         "name": "Картошка",
         "desc": "Очень вкусная картошечка",
         "cost": 71,
         "mass": 345,
         "img_path": "/food/images/1.jpg",
         "comp": "none",
         "type": 18,
         },
        {"id": 1,
         "name": "Котлета",
         "desc": "Очень вкусная котлетка",
         "cost": 54,
         "mass": 789,
         "img_path": "/food/images/2.jpg",
         "comp": "none",
         "type": 0,
         },
        {"id": 2,
         "name": "Картошка с котлетой",
         "desc": "Очень вкусная картошкеча с котлеткой",
         "cost": 5002,
         "mass": 1002,
         "img_path": "/food/images/3.jpg",
         "comp": "none",
         "type": 17,
         },
    ] # Меню при первом запуске

with open('first_start.pck', 'rb') as f:
    first_start = pickle.load(f)
if first_start:
    #import os
    #os.remove("DISHES.db")
    print('UPDATING DATABASE')
    for i in eda:
        print(i)
        fdb.add_dish(i['name'], i['desc'], i['cost'], i['mass'], i['img_path'], i['type'], i['comp'])
    with open('first_start.pck', 'wb') as f:
        pickle.dump(False, f)




@app.get('/get_food', response_class=HTMLResponse)
async def get_food(request: Request):
    return get_dishes(json.dumps(list(range(21))))
    return json.dumps(eda)


@app.post('/get_dishes')
def get_dishes(types):

    types = json.loads(types)
    print(types)
    f = fdb.get_query(types)
    print(f)
    return f


@app.post('/change_dish')
def change_dish(id, name, desc, cost, mass, img, type, comp):
    return fdb.change_dish(id, name, desc, cost, mass, img, type, comp)


@app.post('/delete_dish')
def delete_dish(id):
    return fdb.delete_dish(id)
#endregion
debug = True
if __name__ == '__main__':
    if debug:
        uvicorn.run("main:app", port=8000, reload=True, access_log=False)
    else:
        uvicorn.run("main:app", port=8000, reload=True, access_log=False, host='192.168.0.109')