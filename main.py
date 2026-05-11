from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from database import SessionLocal
import crud


app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():

    return {"message": "MyAlbum API"}


#users
@app.post("/users")
def create_user(nome: str,db: Session = Depends(get_db)):

    return crud.create_user(db, nome)


@app.get("/users")
def get_users(db: Session = Depends(get_db)):

    return crud.get_users(db)

#stickers
@app.get("/stickers")
def get_stickers(db: Session = Depends(get_db)):

    return crud.get_all_stickers(db)

#album
@app.post("/album/add")
def add_sticker(user_id: int,sticker_id: int,db: Session = Depends(get_db)):

    return crud.add_sticker_to_album(db,user_id,sticker_id)


@app.get("/album/{user_id}")
def get_album(user_id: int,db: Session = Depends(get_db)):

    return crud.get_user_album(db,user_id)