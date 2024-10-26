import cv2
import tempfile
import os
import time

from background_subtraction import BackgroundSubtractorDetector
from yolo import YOLOv11Detector
from tracker import ProbabilisticTracker

async def process_video(file, detector_type):
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
    
    # Verifica qual método vai ser usado no processamento
    if detector_type == "background-subtraction":
        detector = BackgroundSubtractorDetector()
    elif detector_type == "yolo":
        detector = YOLOv11Detector("bee_model.pt")
    else:
        os.remove(temp_file_path)
        return {"error": "Método não reconhecido"}

    tracker = ProbabilisticTracker()
    events = []

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_resized = cv2.resize(frame, (1920, 1920))
        timestamp = cap.get(cv2.CAP_PROP_POS_FRAMES) / fps  # Calcula o timestamp em segundos

        # Faz a detecção
        detections = detector.detect(frame_resized)

        # Atualiza o tracker
        tracker.update(frame_resized, detections, timestamp)

        # Mostra o frame processado
        frame_resized_small = cv2.resize(frame_resized, (1200, 1200))
        # cv2.imshow('Original', frame_resized_small)

        # Pausa até que uma tecla seja pressionada
        key = cv2.waitKey(30) & 0xFF
        if key == ord('q'):
            break

    # Obtém a taxa de frames (FPS) e o número total de frames
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_count = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

    # Calcula a duração do vídeo em segundos
    duration = frame_count / fps

    # Libera o objeto VideoCapture e remove o arquivo temporário
    cap.release()
    cv2.destroyAllWindows()
    os.remove(temp_file_path)

    # Registra o tempo de fim e calcula a duração do processamento
    end_time = time.time()
    processing_time = end_time - start_time

    return {
        "filename": file.filename,
        "duration_seconds": duration,
        "resolution": f"{int(width)}x{int(height)}",
        "processing_time_seconds": processing_time,
        "events": tracker.crossing_events
    }
