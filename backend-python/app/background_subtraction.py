import cv2

# Classe base para os detectores
class Detector:
    def detect(self, frame):
        raise NotImplementedError("Este método deve ser sobrescrito.")

# Detector baseado em Background Subtraction
class BackgroundSubtractorDetector(Detector):
    def __init__(self):
        self.fgbg = cv2.createBackgroundSubtractorMOG2(history=500, varThreshold=50)

    def detect(self, frame):
        # Aplica a subtração de fundo
        fgmask = self.fgbg.apply(frame)

        # Aplica um filtro Gaussian para suavizar a máscara
        blurred = cv2.GaussianBlur(fgmask, (3, 3), 0)

        # Aplica um limiar binário para obter uma máscara mais limpa
        _, thresh = cv2.threshold(blurred, 160, 255, cv2.THRESH_BINARY)

        # Cria um kernel elíptico para a operação morfológica
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))

        # Aplica fechamento para unir contornos
        morph_img = cv2.morphologyEx(thresh, cv2.MORPH_CLOSE, kernel)

        # Aplica uma operação de abertura para remover pequenos ruídos
        morph_img = cv2.morphologyEx(morph_img, cv2.MORPH_OPEN, kernel)

        # Encontra os contornos na imagem morfológica
        contours, _ = cv2.findContours(morph_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        detections = []
        for contour in contours:
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = max(w, h) / min(w, h)

            # Ignora áreas pequenas ou contornos fora do padrão
            if cv2.contourArea(contour) >= 300 and aspect_ratio <= 4:
                detections.append((x, y, w, h, 1.0))  # Adiciona confiança 1.0 para manter o padrão

        return detections

# Executa o processamento
# if __name__ == "__main__":
#     detector = BackgroundSubtractorDetector()  # Aqui você pode trocar para o detector Yolo, por exemplo
#     tracker = ProbabilisticTracker()
#     video_path = 'beedio.mp4'
#     events = process_video(video_path, detector, tracker)

#     # Exibe os eventos de entrada e saída
#     for event in events:
#         print(event)
