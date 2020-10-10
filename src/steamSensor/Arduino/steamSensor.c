/*******************************
           Connection:
             VCC-5V
             GND-GND
             S-Analog pin 0

 You can put the sensor on your palm,
 it may sense the humidity of your palm
 ********************************/

void setup()
{
  Serial.begin(9600);// open serial port, set the baud rate to 9600 bps
}
void loop()
{
  int sensorValue;
  sensorValue = analogRead(0);   //connect Steam sensors to Analog 0
  Serial.println(sensorValue); //print the value to serial
  delay(200);
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
  for (int i=0; i<4; i++)
  {
    Wire.write(dataArray[i]);  //data bytes are queued in local buffer
  }
}