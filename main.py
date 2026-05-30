from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import SessionLocal
import crud


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():
    return {"message": "MyAlbum API"}


# users
@app.post("/users")
def create_user(nome: str, db: Session = Depends(get_db)):
    return crud.create_user(db, nome)

@app.get("/users")
def get_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

@app.get("/users/me")
def get_or_create_user(db: Session = Depends(get_db)):
    return crud.get_or_create_default_user(db)


# stickers
@app.get("/stickers")
def get_stickers(db: Session = Depends(get_db)):
    return crud.get_all_stickers(db)

@app.get("/stickers/by-code/{codigo}")
def get_sticker_by_code(codigo: str, db: Session = Depends(get_db)):
    return crud.get_sticker_by_codigo(db, codigo)


# album
@app.post("/album/add")
def add_sticker(user_id: int, sticker_id: int, db: Session = Depends(get_db)):
    return crud.add_sticker_to_album(db, user_id, sticker_id)

@app.post("/album/remove")
def remove_sticker(user_id: int, sticker_id: int, db: Session = Depends(get_db)):
    return crud.remove_sticker_from_album(db, user_id, sticker_id)

@app.delete("/album/entry")
def delete_sticker(user_id: int, sticker_id: int, db: Session = Depends(get_db)):
    crud.delete_sticker_from_album(db, user_id, sticker_id)
    return {"message": "Figurinha removida do álbum"}

@app.get("/album/{user_id}")
def get_album(user_id: int, db: Session = Depends(get_db)):
    return crud.get_user_album(db, user_id)
