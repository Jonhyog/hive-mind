import ujson
import urequests

url = 'http://localhost:3003/metrics/'

def write_data(readings, ids, timestamp):
    headers = {'Content-Type': 'application/json'}
    for key, val in readings.items():
        data = {
            'sensorId':  ids['sensor_id'],
            'hiveId': ids['hive_id'],
            'value': str(val),
            'timestamp': timestamp
        }

        response = urequests.post(f'{url}{key}', data=ujson.dumps(data), headers=headers)
        response.close()

        # data = '{"sensorId": ' + ids["sensor_id"] + ', '
        # data += '"hiveId": ' + ids["hive_id"] + ', '
        # data += '"value": ' + str(val) + ', '
        # data += '"timestamp": ' + timestamp + "}"
        
        # response = urequests.post(url + f'{key}.json', data=data, headers=headers)
        # response.close()

        if response.status_code == 200:
            print('Data written successfully')
        else:
            print('Failed to write data:', response.status_code)

    print()
