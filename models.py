from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship, declarative_base


Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    nome = Column(String, nullable=False)
    stickers = relationship("AlbumSticker", back_populates="user")

class Sticker(Base):
    __tablename__ = "stickers"

    id = Column(Integer, primary_key=True)
    codigo = Column(String, unique=True, nullable=False)
    jogador = Column(String, nullable=False)
    selecao = Column(String, nullable=False)  

class AlbumSticker(Base):
    __tablename__ = "album_stickers"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    sticker_id = Column(Integer, ForeignKey("stickers.id"))
    quantidade = Column(Integer, default=1)

    user = relationship("User", back_populates="stickers")

    sticker = relationship("Sticker")