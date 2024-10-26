import cv2
from ultralytics import YOLO

# Classe base para os detectores
class Detector:
    def detect(self, frame):
        raise NotImplementedError("Este método deve ser sobrescrito.")

# Detector baseado no YOLOv11 com o modelo best5.pt
class YOLOv11Detector(Detector):
    def __init__(self, model_path, conf_threshold=0.5):
        self.model = YOLO(model_path)  # Carrega o modelo YOLOv11 ou superior
        self.conf_threshold = conf_threshold

    def detect(self, frame):
        results = self.model(frame)  # Faz a inferência no frame
        detections = []

        for result in results:
            for box in result.boxes:
                # Apenas considera detecções da classe 0 (abelhas, por exemplo)
                if box.cls == 0 and box.conf >= self.conf_threshold:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    w = x2 - x1
                    h = y2 - y1
                    detections.append((x1, y1, w, h, box.conf))

        return detections

# Executa o processamento
# if __name__ == "__main__":
#     model_path = 'bee_model.pt'  # Caminho para o modelo treinado best5.pt
#     detector = YOLOv11Detector(model_path)  # Usa o detector YOLOv11
    
#     tracker = ProbabilisticTracker()
#     video_path = 'beedio.mp4'
#     events = process_video(video_path, detector, tracker)

#     # Exibe os eventos de entrada e saída
#     for event in events:
#         print(event)
