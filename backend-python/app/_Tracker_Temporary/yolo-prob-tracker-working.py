import cv2
import numpy as np
import math
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

# Classe para o tracker baseado em probabilidade
class ProbabilisticTracker:
    def __init__(self):
        self.prev_cont = []
        self.curr_cont = []
        self.count_in = 0
        self.count_out = 0
        self.center_line_x = 1400  # Linha vertical no centro do frame
        self.crossing_events = []  # Lista para armazenar os eventos de entrada e saída

    def calculate_probability(self, x, y, cx, cy, a=600, b=200):
        dx = cx
        dy = cy

        hive_x = 0
        hive_y = 960
        t = -math.atan2(dy - hive_y, dx - hive_x)

        # Rotação das coordenadas (x1, y1) para (x2, y2)
        x1 = x - cx
        y1 = y - cy
        x2 = x1 * math.cos(t) - y1 * math.sin(t)
        y2 = y1 * math.cos(t) + x1 * math.sin(t)

        # Reta que corta a elipse ao meio
        kx = (1 / t) * x + (cy - cx / t) if t != 0 else float("inf")
        c = a / 3
        fxy = 0
        if cy > hive_y:
            fxy = -(x2 / a) ** 2 - (y2 / b) ** 2 + 1 if kx >= y else -(x2 / c) ** 2 - (y2 / b) ** 2 + 1
        else:
            fxy = -(x2 / a) ** 2 - (y2 / b) ** 2 + 1 if -kx >= -y else -(x2 / c) ** 2 - (y2 / b) ** 2 + 1

        return math.exp(fxy) / math.exp(1)

    def update(self, frame, detections, timestamp):
        self.prev_cont = self.curr_cont
        self.curr_cont = []

        for (x, y, w, h, conf) in detections:
            cx, cy = x + w // 2, y + h // 2
            self.curr_cont.append((cx, cy, w, h, conf))

            # Desenha caixa verde para as detecções atuais
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

        # Associa as detecções anteriores e atuais
        used_prev_contours = set()
        for (cx_curr, cy_curr, w_curr, h_curr, conf_curr) in self.curr_cont:
            best_prob = -float('inf')
            best_prev_box = None

            for (cx_prev, cy_prev, w_prev, h_prev, conf_prev) in self.prev_cont:
                if (cx_prev, cy_prev) in used_prev_contours:
                    continue

                prob = self.calculate_probability(cx_prev, cy_prev, cx_curr, cy_curr)
                if prob > best_prob:
                    best_prob = prob
                    best_prev_box = (cx_prev, cy_prev, conf_prev)

            if best_prev_box and best_prob > 0.3:
                cx_prev, cy_prev, conf_prev = best_prev_box
                cv2.line(frame, (cx_curr, cy_curr), (cx_prev, cy_prev), (0, 255, 255), 2)

                # Verifica se cruzou a linha central
                if (cx_prev > self.center_line_x and cx_curr < self.center_line_x):
                    self.count_in += 1
                    self.crossing_events.append({
                        'direction': 'in',
                        'timestamp': timestamp,
                    })
                elif (cx_prev < self.center_line_x and cx_curr > self.center_line_x):
                    self.count_out += 1
                    self.crossing_events.append({
                        'direction': 'out',
                        'timestamp': timestamp,
                    })

                used_prev_contours.add((cx_prev, cy_prev))

        # Desenha as caixas azuis do frame anterior
        for (cx_prev, cy_prev, w_prev, h_prev, conf_prev) in self.prev_cont:
            cv2.rectangle(frame, (cx_prev - w_prev // 2, cy_prev - h_prev // 2),
                          (cx_prev + w_prev // 2, cy_prev + h_prev // 2), (255, 0, 0), 2)

        # Exibe a contagem no frame
        # self.draw_info(frame)

    def draw_info(self, frame):
        cv2.line(frame, (self.center_line_x, 0), (self.center_line_x, 1920), (0, 0, 255), 2)
        cv2.putText(frame, f"Entradas: {self.count_in}", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.putText(frame, f"Saidas: {self.count_out}", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

# Função principal para processar o vídeo
def process_video(video_path, detector, tracker):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)  # Obtém os FPS do vídeo
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
        #cv2.imshow('Original', frame_resized_small)

        # Pausa até que uma tecla seja pressionada
        key = cv2.waitKey(30) & 0xFF
        if key == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

    return tracker.crossing_events  # Retorna os eventos de cruzamento

# Executa o processamento
if __name__ == "__main__":
    model_path = 'bee_model.pt'  # Caminho para o modelo treinado best5.pt
    detector = YOLOv11Detector(model_path)  # Usa o detector YOLOv11
    
    tracker = ProbabilisticTracker()
    video_path = 'beedio.mp4'
    events = process_video(video_path, detector, tracker)

    # Exibe os eventos de entrada e saída
    for event in events:
        print(event)