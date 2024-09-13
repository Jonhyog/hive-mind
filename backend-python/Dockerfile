FROM python:3.9

RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0
    
WORKDIR /app

COPY . /app

RUN pip install --no-cache-dir -r requirements.txt

ENV NAME World

# Entrypoint is being overwritten in docker-compose.yml at root folder
CMD []