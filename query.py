from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import  Column, Integer, String, JSON
from sqlalchemy.orm import sessionmaker
import json


SQLALCHEMY_DATABASE_URL = "sqlite:///./ORDERS.db"


engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autoflush=False, bind=engine)
Base = declarative_base()


class Order(Base):
    __tablename__ = "Orders"
    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(Integer)
    order_comp = Column(JSON)
    order_comment = Column(String, default="")
    status = Column(String, default="Waiting")


Base.metadata.create_all(bind=engine)
db = SessionLocal()


def add_order(table_number, order_comp, order_comment):
    new_order = Order(table_number=table_number, order_comp=order_comp, order_comment=order_comment)
    db.add(new_order)
    db.commit()
    return new_order.id


def get_query():
    return db.query(Order).all()


def change_status(id, status):
    people = db.query(Order).filter(Order.id == id).first()
    people.status = status
    db.commit()
    return db.query(Order).all()


def delete_order(id):
    people = db.query(Order).filter(Order.id == id).first()
    db.delete(people)
    db.commit()



