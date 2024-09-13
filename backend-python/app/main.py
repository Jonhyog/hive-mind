import cv2.version
from fastapi import FastAPI, File, UploadFile
from beeCounting import process_video
import cv2 

app = FastAPI()

@app.get("/")
def read_root():
    return {
        "response":"Python's Server is Up and running!!",
        "OpenCv-Version":cv2.__version__
            }

@app.post("/upload-video")
async def read_video(file: UploadFile = File(...)):
    return await process_video(file)