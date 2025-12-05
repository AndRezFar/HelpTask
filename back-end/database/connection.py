from pymongo import MongoClient

def get_db():
    client = MongoClient("MONGO_URI")
    db = client["HelpTask"]
    return db

db = get_db()
colecao = db["tarefas"]