import os
import ubinascii
import urandom
import api

def generate_short_uuid():
    return ubinascii.hexlify(urandom.getrandbits(32).to_bytes(8, 'little')).decode()[:8]

def get_ids(file_name, location):
    hive_id = None
    bme_id = None
    noise_id = None

    if file_name in os.listdir():
        with open(file_name, 'r') as file:
            data = file.readlines()
            if len(data) >= 2:
                hive_id = data[0].strip().split(' ')[1]
                bme_id = data[1].strip().split(' ')[1]
                noise_id = data[2].strip().split(' ')[1]
    else:
        print('ids.txt not found, generating new IDs')
        hive_id = generate_short_uuid()
        bme_id = generate_short_uuid()
        noise_id = generate_short_uuid()
        # Register new ids on db
        hive_registered = api.write_hiveId(hive_id, location)
        bme_registered = api.write_sensorId(bme_id, 'BME')
        noise_registered = api.write_sensorId(noise_id, 'Noise')
        # Save new ids on .txt file
        if hive_registered and bme_registered and noise_registered:
            with open(file_name, 'w') as file:
                file.write(f'hive_id: {hive_id}\n')
                file.write(f'bme_id: {bme_id}\n')
                file.write(f'noise_id: {noise_id}\n')
        print()

    return hive_id, bme_id, noise_id