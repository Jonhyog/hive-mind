import cv2
from fastapi import FastAPI, File, UploadFile, Header
from io import BytesIO
from beeCounting import process_video

app = FastAPI()

@app.get("/")
def read_root():
    return {
        "response":"Python's Server is Up and running!!",
        "OpenCv-Version":cv2.__version__
    }

@app.post("/process-video")
async def upload_video(file: UploadFile = File(...), detector_type: str = Header(...)):
    video_data = await file.read()
    return await process_video(BytesIO(video_data), detector_type)
