from pymongo import MongoClient
from pymongo.server_api import ServerApi

def get_db():
    mongo_uri = MongoClient("MONGO_URI")
    if not mongo_uri:
        raise Exception("ERRO: Variável MONGO_URI não encontrada no ambiente!")

    client = MongoClient(mongo_uri, server_api=ServerApi('1'))

    db = client["HelpTask"]
    return db

db = get_db()
colecao = db["tarefas"]