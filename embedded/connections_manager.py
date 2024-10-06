import network
import time

def connect_to_wifi():
    REDE = "Sala_2.4G"
    SENHA = "522FBDB710"

    ### Conexão wi-fi, com rede e senha pré-definidos
    GLOB_WLAN = network.WLAN(network.STA_IF)
    GLOB_WLAN.active(True)

    counter = 0
    print(f"Attempts to connect to the {REDE} Wi-Fi network: ", end='')
    while not GLOB_WLAN.isconnected():
        GLOB_WLAN.connect(REDE, SENHA)
        counter += 1
        print(counter, ", ", end='')
        time.sleep(4)
        pass
    print("Wi-Fi Connected")
    
