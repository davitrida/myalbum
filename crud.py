from sqlalchemy.orm import Session
from models import User, Sticker, AlbumSticker


#usuario
def create_user(db: Session, nome: str):
    user = User(nome = nome)

    db.add(user)
    db.commit()
    db.refresh(user)

    return user

def get_users(db: Session):
    return db.query(User).all()

#sticker
def get_all_stickers(db: Session):
    return db.query(Sticker).all()

def get_sticker_by_codigo(db: Session, codigo, str):
    return db.query(Sticker).filter(Sticker.codigo == codigo).first()

#album
def add_sticker_to_album(db: Session, user_id: int, sticker_id: int):
    album_sticker = db.query(AlbumSticker).filter(AlbumSticker.user_id == user_id, AlbumSticker.sticker_id == sticker_id).first()

    if album_sticker:

        album_sticker.quantidade += 1

    else:

        album_sticker = AlbumSticker(user_id = user_id, sticker_id = sticker_id, quantidade = 1)

        db.add(album_sticker)
        db.commit()
        db.refresh(album_sticker)
        return album_sticker
    
def get_user_album(db: Session, user_id: int):
    
    return db.query(AlbumSticker).filter(AlbumSticker.user_id == user_id).all()


    
