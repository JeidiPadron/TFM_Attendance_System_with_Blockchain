# TFM Attendance System with Blockchain

Here you will find the code to implemet Biometric Work Attendance Management and Logging with a Blockchain System, as a part of my Thesis Project for MSc in Internet of Things

## Summary
This project consists on the development of an end-to-end prototype for generating , collecting, storing, and getting reports about employee attendance time, using a decentralized app (DApp) executed on web browser, peer-to-peer InterPlanetary File System (IPFS), and smart contracts from Ethereum blockchain.
Open *Attendance System with Blockchain* folder to download the document with complete description, instructions to configure and test.


## List of Material
The following are the components required to make IoT Based Biometric Fingerprint Attendance System. All the components were be purchased from Amazon Spain. The purchase links are given below:

Component | Description | Amazon ES
--- | --- | ---
NodeMCU | ESP8266-12E Board | [https://amzn.to/2Q7b5TG](https://amzn.to/2Q7b5TG)
Fingerprint Sensor | R307 Module | [https://amzn.to/3muwQZO](https://amzn.to/3muwQZO)
OLED Display | 0.96" SSD1306 I2C  | [https://amzn.to/3d19h7C](https://amzn.to/3d19h7C)

## How to clone Arduino codes
I recommend to follow step by step implementation
* Download *IoT_device* directory with all Arduino codes
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
* To install libraries and depencencies, just type and execute
```bash
npm install
```
* To interact with DApp, write this command in the same DApp directory 
```bash
npm run serve
```
* open any browser, like Firefox or Chrome with the following address:
http://localhost:9011/

## Preview
This is the network architecture deployed.

![](/preview.png)
