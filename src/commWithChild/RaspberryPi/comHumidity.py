# -*- coding: UTF-8 -*-
import smbus
import time
import sys 
import json
import time

# 設定樹莓派I2C的總線
bus = smbus.SMBus(1)

# 設定Arduino 的I2C位置
address = 0x04

#result = [20,30,40,50]

# 傳送訊息
def writeNumber(value):
    bus.write_byte(address, value)
    return -1

# 讀取訊息
def readNumber():
    number = bus.read_i2c_block_data(address, 0, 4)
    print(number)
    return number

writeNumber(1)

time.sleep(1)

result = readNumber()

json = json.dumps(result)

print(str(json))

sys.stdout.flush()
