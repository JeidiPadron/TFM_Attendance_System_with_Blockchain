# TFM_Attendance_System_with_Blockchain
Thesis Project
# README.MD
Here you will find the code to implemet Biometric Work Attendance Management and Logging with a Blockchain System, as a part of my Thesis for MSc in Internet of Things

## Content
This project consists on the development of an end-to-end prototype for generating , collecting, storing, and getting reports about employee attendance time, using a decentralized app executed on web browser, peer-to-peer InterPlanetary File System (IPFS), and smart contracts from Ethereum blockchain.


## List of Material
The following are the components required to make IoT Based Biometric Fingerprint Attendance System. All the components were be purchased from Amazon Spain. The purchase links are given below:

Component | Description | Amazon ES
--- | --- | ---
NodeMCU | ESP8266-12E Board | [https://amzn.to/2Q7b5TG](https://amzn.to/2Q7b5TG)
Fingerprint Sensor | R307 Module | [https://amzn.to/3muwQZO](https://amzn.to/3muwQZO)
OLED Display | 0.96" SSD1306 I2C  | [https://amzn.to/3d19h7C](https://amzn.to/3d19h7C)

## How to clone Arduino codes
I recommend to follow step by step implementation
* Use CH341SER for USB driver recognition of NodeMCU board
* Test NodeMCU functions using blink leds. 
* Test Wi-Fi connection (change parameters on code)
* Test LCD Screen with hello world code (be carefull with I2C pinout)
* Test fingerprint (use direct connection USB (not UART) with SFGDemo (see Adafruit page for details)
* Put all together and test TFM.ino

## How to connect to Edge server
* Edge Server aggregate all logs for all employees and generated a single Daily Report
* Download XAMPP to run local a database
* Copy *iotedge* directory in your laptop, at C:\...\XAMPP\htdocs
* open any browser, like Firefox or Chrome with the following address:
http://localhost/iotedge/index.php

## Distributed Application DApp
DApp connects with blockchain, to store Attendance Report in blockchain
* Download Node.js program from web
* copy *DAppTimeLog* directory in your laptop
* install MetaMask extension in your browser
* To install and run DApp just type and execute
```bash
npm install
```

```bash
npm run serve
```
* open any browser, like Firefox or Chrome with the following address:
http://localhost:9011/

## Preview
Insert here an image of the preview if your project has one. The image can be into the project, you have to indicate the route and look like this.

![](/preview.png)
