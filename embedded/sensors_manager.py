import time
import gc
import api
from machine import Pin, I2C
from bme680 import *

class SensorsManager:
    def __init__(self):
        print("Setting sensors")
        self.bme680 = self._set_bme680()
        self.sensors = {
            # 'proximity':
            # 'sound':
            'temperature': {'object': self.bme680, 'read_method': self.__read_temperature},
            'pressure': {'object': self.bme680, 'read_method': self.__read_pressure},
            'humidity': {'object': self.bme680, 'read_method': self.__read_humidity},
            # 'gas':
        }
    
    # Inicialização do sensor BME680
    def _set_bme680(self):
        bme680 = None
        print("Trying to set BME680:")
        while bme680 is None:
            try:
                i2c = I2C(0, scl=Pin(21), sda=Pin(20))
                bme680 = BME680_I2C(i2c)
                print("BME680 set successfully")
            except Exception as e:
                print(f"Failed to set BME680: {e}")
                bme680 = None
            if bme680 is None:
                print("Trying again in 3 seconds")
                time.sleep(3)
        print()
        return bme680
    
    # Leituras
    def start_reading(self, zone_offset, hive_id, sensor_id):        
        while True:
            gc.collect()
            print("Starting sensors reading:")
            readings = self.__read_sensors()
            
            # Atualizar o horário local
            curr_time_utc = time.gmtime()
            curr_time_utc_secs = time.mktime(curr_time_utc)
            curr_time_local = time.localtime(curr_time_utc_secs + zone_offset)
            
            # Criação do timestamp
            day = curr_time_local[2]
            month = curr_time_local[1]
            year = curr_time_local[0]
            hour = curr_time_local[3]
            minute = curr_time_local[4]
            second = curr_time_local[5]
            timestamp = f"{year}-{month:02d}-{day:02d}T{hour:02d}:{minute:02d}:{second:02d}.000Z"
            print(f"Timestamp: {timestamp}")
            print()
            
            gc.collect()
            ids = {
                "hive_id": hive_id,
                "sensor_id": sensor_id
            }
            print("Writing data")
            api.write_data(readings, ids, timestamp)
            
            # Dormir até próxima leitura
            time.sleep(4)
    
    def __read_sensors(self):
        readings = {}
        for sensor_type in self.sensors:
            gc.collect()
            
            print("    Reading now sensor:", sensor_type)
            read_method = self.sensors[sensor_type]['read_method']
            sensor = self.sensors[sensor_type]['object']
            
            reading = read_method(sensor)
            print("    Reading:", reading)
            readings[sensor_type] = reading
        
        return readings
    
    def __read_temperature(self, bme):
        if bme is None:
            return None
        else:
            return bme.temperature
        
    def __read_pressure(self, bme):
        if bme is None:
            return None
        else:
            return bme.pressure

    def __read_humidity(self, bme):
        if bme is None:
            return None
        else:
            return bme.humidity