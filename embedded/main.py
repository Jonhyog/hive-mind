from connections_manager import connect_to_wifi
from id_manager import get_ids
from sensors_manager import SensorsManager
import time
import ntptime

connect_to_wifi()

# Ajuste do horário
time.sleep(5)
try:
    ntptime.settime()
    print("ntptime.settime() executed successfully")
except Exception as e:
    print("Error adjusting time:", e)
print()

# Obtém o horário atual em UTC
current_time_utc = time.gmtime()  # Time in UTC
print("UTC Time:", current_time_utc)

# Aplica o offset para o fuso horário local (São Paulo: UTC-3)
timezone_offset = -3 * 3600
current_time_sec = time.mktime(current_time_utc)
current_time_local = time.localtime(current_time_sec + timezone_offset)
print("Local Time:", current_time_local)
print()

# Obtém hive_id, bme_id e noise_id, ou cria se não houver
hive_id, bme_id, noise_id = get_ids('ids.txt')
    
# Instanciação das Classes Gerenciadoras
sensors_manager = SensorsManager()
sensors_manager.start_reading(timezone_offset, hive_id, bme_id, noise_id)
