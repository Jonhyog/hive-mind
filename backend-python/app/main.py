from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return { i: f'Python\'s FastApi is up and running {i}'  for i in range(100) }

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}
