import ujson
import urequests

url = 'http://143.106.24.56/32:3003/'

def write_data(readings, ids, timestamp):
    headers = {'Content-Type': 'application/json'}
    for key, val in readings.items():
        data = '{"sensorId": ' + ids["sensor_id"] + ', '
        data += '"hiveId": ' + ids["hive_id"] + ', '
        data += '"value": ' + str(val) + ', '
        data += '"timestamp": ' + timestamp + "}"
        
        response = urequests.post(url + f'{key}.json', data=data, headers=headers)
        response.close()
        if response.status_code == 200:
            print('Data written successfully')
        else:
            print('Failed to write data:', response.status_code)

    print()
