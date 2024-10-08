import gc
import ujson
import urequests

url = 'http://localhost:3003'

def write_data(readings, ids, timestamp):
    headers = {'Content-Type': 'application/json'}
    for key, val in readings.items():
        data = {
            'sensorId':  ids['bme_id'] if key != 'noise' else ids['noise_id'],
            'hiveId': ids['hive_id'],
            'value': str(val),
            'timestamp': timestamp
        }
        
        gc.collect()
        response = urequests.post(f'{url}/metrics/{key}', data=ujson.dumps(data), headers=headers)
        response.close()

        if response.status_code == 200:
            print('Data written successfully')
        else:
            print('Failed to write data:', response.status_code)

    print()

def write_hiveId(hiveId, location='', description=''):
    headers = {'Content-Type': 'application/json'}

    data = {
        'hiveId':  hiveId,
        'location': location,
        'description': description,
    }

    gc.collect()
    response = urequests.post(f'{url}/hive', data=ujson.dumps(data), headers=headers)
    response.close()

    if response.status_code == 200:
        print('Hive ID registered successfully')
    else:
        print('Failed to register hive ID:', response.status_code)

def write_sensorId(sensorId, sensor_type, description=''):
    headers = {'Content-Type': 'application/json'}

    data = {
        'sensorId':  sensorId,
        'description': description
    }

    gc.collect()
    response = urequests.post(f'{url}/sensor', data=ujson.dumps(data), headers=headers)
    response.close()

    if response.status_code == 200:
        print('Sensor ID registered successfully, sensor is of type:', sensor_type)
    else:
        print(f'Failed to register sensor ID: {response.status_code}, sensor is of type: {sensor_type}')