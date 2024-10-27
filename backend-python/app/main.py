import cv2
from fastapi import FastAPI, File, UploadFile, Form, HTTPException, BackgroundTasks
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
async def upload_video(
        background_tasks: BackgroundTasks, 
        file: UploadFile = File(...), 
        detector_type: str = Form(...),
        video_id: str = Form(...)):
    try:
        video_data = await file.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File read error: {str(e)}")

    background_tasks.add_task(process_video,
        BytesIO(video_data), detector_type, file.filename, str(video_id))
    return { 
        "message": "Video processing started successfully",
        "video_id": str(video_id),
        "status": "Processing"
    }
