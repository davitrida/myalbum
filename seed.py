import json
import os

from database import SessionLocal
from models import Sticker

db = SessionLocal()

DATA_FOLDER = "data"

def load_json_files():

    for file_name in os.listdir(DATA_FOLDER):

        if file_name.endswith(".json"):

            file_path = os.path.join(DATA_FOLDER, file_name)

        with open(file_path, "r", enconding = "utf-8") as file:

            stickers = json.load(file)

            save_stickers(stickers)


def save_stickers(stickers):

    for sticker_data in stickers:

        sticker_exists = db.query(Sticker).filter(Sticker.codigo == sticker_data["codigo"]).first()

        if sticker_exists:
            continue

        sticker = Sticker(codigo = sticker_data["codigo"],
                          jogador = sticker_data["jogador"],
                          selecao = sticker_data["selecao"])
        
        db.add(sticker)

    db.commit()

load_json_files()

db.close()

print("Figurinhas importadas com sucesso!")
