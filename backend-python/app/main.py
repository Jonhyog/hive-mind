import cv2.version
from fastapi import FastAPI, File, UploadFile
from beeCounting import process_video
import cv2 
import base64
from io import BytesIO

app = FastAPI()

@app.get("/")
def read_root():
    return {
        "response":"Python's Server is Up and running!!",
        "OpenCv-Version":cv2.__version__
    }

@app.post("/process-video")
async def upload_video(file: str):
    video_data = base64.b64decode(file)
    return await process_video(BytesIO(video_data))
