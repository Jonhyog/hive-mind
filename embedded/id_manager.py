import os
import ubinascii
import urandom

def generate_short_uuid():
    return ubinascii.hexlify(urandom.getrandbits(32).to_bytes(8, 'little')).decode()[:8]

def get_ids(file_name):
    hive_id = None
    sensor_id = None

    if file_name in os.listdir():
        with open(file_name, 'r') as file:
            data = file.readlines()
            if len(data) >= 2:
                hive_id = data[0].strip().split(' ')[1]
                sensor_id = data[1].strip().split(' ')[1]
    else:
        hive_id = generate_short_uuid()
        sensor_id = generate_short_uuid()
        with open(file_name, 'w') as file:
            file.write(f'hive_id: {hive_id}\n')
            file.write(f'sensor_id: {sensor_id}\n')

    return hive_id, sensor_id