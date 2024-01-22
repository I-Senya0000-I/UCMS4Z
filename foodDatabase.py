from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import  Column, Integer, String, JSON
from sqlalchemy.orm import sessionmaker
import json


SQLALCHEMY_DATABASE_URL = "sqlite:///./DISHES.db"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autoflush=False, bind=engine)
Base = declarative_base()


class Dish(Base):
    __tablename__ = "Dish"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    desc = Column(String)
    cost = Column(Integer)
    mass = Column(Integer)
    img = Column(String)
    type = Column(String)
    comp = Column(String)


Base.metadata.create_all(bind=engine)
db = SessionLocal()


def add_dish(name, desc, cost, mass, img, type, comp):
    new_dish = Dish(name=name, desc=desc, cost=cost, mass=mass, img=img, type=type, comp=comp)
    db.add(new_dish)
    db.commit()
    return new_dish


def get_query(types):
    res = []
    for typ in types:
        q = db.query(Dish).filter(Dish.type == typ)
        print(typ, [i.id for i in q])
        res += q
    return res


def change_dish(id, name, desc, cost, mass, img, type, comp):
    q = db.query(Dish).filter(Dish.id == id).first()
    q.name = name
    q.desc = desc
    q.cost = cost
    q.mass = mass
    q.img = img
    q.type = type
    q.comp = comp
    db.commit()
    return q


def delete_dish(id):
    q = db.query(Dish).filter(Dish.id == id).first()
    db.delete(q)
    db.commit()
    return "Dish deleted"