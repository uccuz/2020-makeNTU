#include <Wire.h>

#define SLAVE_ADDRESS 0x04    // 設定Arduino開發板I2C的位址
int number = 0;
int state = 0;

void setup() {

Serial.begin(9600);   // Serial通訊埠通訊設為9600速率
Wire.begin(SLAVE_ADDRESS);  // 初始化Arduino的I2C位址

Wire.onReceive(receiveData); //I2C訊號接收時，啟用函式
Wire.onRequest(sendData);  //主機要求讀取時，啟用函式

Serial.println("Ready!");
}

void loop() {
delay(100);
}

// callback for received data
void receiveData(int byteCount){
while(Wire.available()) {  //當I2C的buffer中有資料時進入迴圈
  number = Wire.read();   //指定nubmer 等於讀取的訊息
  Serial.print("data received: ");
  Serial.println(number);

  }
}

// callback for sending data
void sendData(){
Wire.write(number);
}