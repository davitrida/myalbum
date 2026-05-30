import json
import os

from database import SessionLocal
from models import Sticker

db = SessionLocal()

DATA_FOLDER = "data"

def load_json_files():
    for entry in os.listdir(DATA_FOLDER):
        entry_path = os.path.join(DATA_FOLDER, entry)
        if os.path.isdir(entry_path):
            for file_name in os.listdir(entry_path):
                if file_name.endswith(".json"):
                    file_path = os.path.join(entry_path, file_name)
                    with open(file_path, "r", encoding="utf-8") as file:
                        save_stickers(json.load(file))
        elif entry.endswith(".json"):
            with open(entry_path, "r", encoding="utf-8") as file:
                save_stickers(json.load(file))


def save_stickers(stickers):
    for sticker_data in stickers:
        sticker_exists = db.query(Sticker).filter(Sticker.codigo == sticker_data["codigo"]).first()
        if sticker_exists:
            continue
        sticker = Sticker(
            codigo=sticker_data["codigo"],
            jogador=sticker_data.get("nome") or sticker_data.get("jogador") or "",
            selecao=sticker_data["pais"],
        )
        db.add(sticker)
    db.commit()


load_json_files()
db.close()
print("Figurinhas importadas com sucesso!")
