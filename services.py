from sqlalchemy.orm import Session
from sqlalchemy import func

from models import Sticker
from models import AlbumSticker

#total de figurinhas
def get_total_stickers(db: Session):

    return db.query(Sticker).count()

#total de figurinhas do usuario
def get_user_total_stickers(db: Session, user_id: int):

    total = db.query(func.sum(AlbumSticker.quantidade)).filter(AlbumSticker.user_id == user_id).scalar()

    return total or 0


#figurinhas repetidas
def get_duplicates(db: Session, user_id: int):

    duplicates = db.query(AlbumSticker).filter(AlbumSticker.user_id == user_id, AlbumSticker.quantidade > 1).all()

    return duplicates


#porcentagem completa
def get_completion_percentage(db: Session, user_id: int):

    total_album = db.query(Sticker).count()

    total_user = db.query(AlbumSticker.sticker_id).filter(AlbumSticker.user_id == user_id).distinct().count()

    if total_album == 0:
        return 0

    percentage = (total_user / total_album) * 100

    return round(percentage, 2)

#porcentagem faltando
def get_missing_stickers(db: Session, user_id: int):

    owned_stickers = db.query(AlbumSticker.sticker_id).filter(AlbumSticker.user_id == user_id)

    missing = db.query(Sticker).filter(~Sticker.id.in_(owned_stickers)).all()

    return missing