import cv2
import numpy as np
import tempfile
import os
import time

async def process_video(file):
    # Registra o tempo de início
    start_time = time.time()

    # Cria um arquivo temporário para o vídeo
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
        temp_file.write(await file.read())
        temp_file_path = temp_file.name

    # Abre o vídeo usando OpenCV
    cap = cv2.VideoCapture(temp_file_path)

    if not cap.isOpened():
        # Remove o arquivo temporário em caso de erro
        os.remove(temp_file_path)
        return {"error": "Erro ao abrir o vídeo."}

    # Obtém a taxa de frames (FPS) e o número total de frames
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

    # Calcula a duração do vídeo em segundos
    duration = frame_count / fps

    # Libera o objeto VideoCapture e remove o arquivo temporário
    cap.release()
    os.remove(temp_file_path)

    # Registra o tempo de fim e calcula a duração do processamento
    end_time = time.time()
    processing_time = end_time - start_time

    return {
        "filename": file.filename,
        "duration_seconds": duration,
        "resolution": f"{int(width)}x{int(height)}",
        "processing_time_seconds": processing_time
    }
