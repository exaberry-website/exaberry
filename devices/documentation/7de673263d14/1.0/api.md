---
layout: device_api_document
title: Weather sensors
type_id: 7de673263d14
parameters:
  - name: compatible hardware version
    value: 1.*
  - name: firmware version
    value: 1.0
  - name: USB port
    value: micro-B
  - name: Serial port speed
    value: 115200
  - name: USB voltage
    value: 5V
  - name: USB current
    value: 100mA

links:
  - text: "Exaberry"
    url: "https://www.exaberry.org"
  - text: "Getting Started"
    url: "https://www.exaberry.org/getting_started"
  - text: "Interface Documentation"
    url: "https://www.exaberry.org/interface_documentation"

verbs:
  - verb: write
    properties:
    - path: "calibration.temperature.offset={float}"
      description: "Write to the temperature linear calibration offset."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-500, 500]</span>."
      additional_description: 
        - "The temperature reading is offset by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>offset</i> of the formula."            
 
    - path: "calibration.temperature.scale={float}"
      description: "Write to the temperature linear calibration scale."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:  
        - "The temperature reading is scaled by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>scale</i> of the formula"           
 
    - path: "calibration.pressure.offset={float}"
      description: "Write to the pressure linear calibration offset."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-50000000, 50000000]</span>."
      additional_description:   
        - "The pressure reading is offset by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>offset</i> of the formula."          
 
    - path: "calibration.pressure.scale={float}"
      description: "Write to the pressure linear calibration scale."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:    
        - "The pressure reading is scaled by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>scale</i> of the formula"         
 
    - path: "calibration.humidity.offset={float}"
      description: "Write to the humidity linear calibration offset."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:     
        - "The humidity reading is offset by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>offset</i> of the formula."        
 
    - path: "calibration.humidity.scale={float}"
      description: "Write to the humidity linear calibration scale."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:      
        - "The humidity reading is scaled by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>scale</i> of the formula"       
 
    - path: "device.name={string}"
      description: "Write to the name of the device."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">string</span>."
        - "The length of the <span class=\"bg-light rounded command-var\">{string}</span> should be less than 16."
      additional_description:                         
 
    - path: "device.restart={bool}"
      description: "Write to the switch of restarting the device."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">device.restart</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write device.restart</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write device.restart=True</span>"
      additional_description:                         
 
    - path: "device.reset={bool}"
      description: "Write to the switch of resetting the device."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">device.reset</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write device.reset</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write device.reset=True</span>"
      additional_description:            
        - "Reset calibration parameters and device name to their default values."             
  

  - verb: read
    properties:
    - path: "temperature.value"
      description: "Read the temperature value."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>." 
    - path: "temperature.unit"
      description: "Read the temperature unit."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">enum</span>.The value is<span class=\"bg-light rounded command-var\">{celsius}</span>." 
    - path: "humidity.value"
      description: "Read the relative humidity (RH) value."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>." 
    - path: "humidity.unit"
      description: "Read the humidity unit."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">enum</span>.The value is<span class=\"bg-light rounded command-var\">{percent}</span>." 
    - path: "pressure.value"
      description: "Read the barometric pressure value."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>." 
    - path: "pressure.unit"
      description: "Read the barometric temperature unit."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">enum</span>.The value is<span class=\"bg-light rounded command-var\">{pascal}</span>." 
    - path: "calibration.temperature.offset"
      description: "Read the temperature linear calibration offset."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-500, 500]</span>."
      additional_description: 
        - "The temperature reading is offset by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>offset</i> of the formula."            
 
    - path: "calibration.temperature.scale"
      description: "Read the temperature linear calibration scale."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:  
        - "The temperature reading is scaled by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>scale</i> of the formula"           
 
    - path: "calibration.pressure.offset"
      description: "Read the pressure linear calibration offset."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-50000000, 50000000]</span>."
      additional_description:   
        - "The pressure reading is offset by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>offset</i> of the formula."          
 
    - path: "calibration.pressure.scale"
      description: "Read the pressure linear calibration scale."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:    
        - "The pressure reading is scaled by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>scale</i> of the formula"         
 
    - path: "calibration.humidity.offset"
      description: "Read the humidity linear calibration offset."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:     
        - "The humidity reading is offset by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>offset</i> of the formula."        
 
    - path: "calibration.humidity.scale"
      description: "Read the humidity linear calibration scale."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-100, 100]</span>."
      additional_description:      
        - "The humidity reading is scaled by the value of this property. calibrated_reading = <i>scale</i> * raw_reading + <i>offset</i>. This property is the <i>scale</i> of the formula"       
 
    - path: "device.exaberry"
      description: "Read the URL to the Exaberry.org."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">string</span>."
      additional_description:                         
 
    - path: "device.documentation"
      description: "Read the URL to the documentation."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">string</span>."
      additional_description:                         
 
    - path: "device.name"
      description: "Read the name of the device."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">string</span>."
      additional_description:       
        - "You can customize the device name by writing to this property."                  
 
    - path: "device.systick"
      description: "Read the system ticks since powered up."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
      additional_description:        
        - "The systick is approximately the number of microseconds since power up."                 
 
    - path: "device.id"
      description: "Read the device ID."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">hex</span>."
      additional_description:         
        - "The device ID is unique for each device."                
 
    - path: "device.type_id"
      description: "Read the type ID of the device."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">string</span>."
      additional_description:          
        - "The type ID is unique for different API and hardware design combination."               
 
    - path: "device.firmware.version"
      description: "Read the firmware version."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">string</span>."
      additional_description:                         
 
    - path: "device.hardware.version"
      description: "Read the hardware version."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">string</span>."
      additional_description:                         
  

features:
  - "Temperature, barometric pressure and humidity sensor combo"
  - "Linear calibration available for sensor readings"

dims:
  - name: "A"
    value: "17.0mm"
  - name: "B"
    value: "30.2mm"
  - name: "C"
    value: "12.0mm"
  - name: "D"
    value: "28.6mm"
  - name: "E"
    value: "2.54mm"

examples:
  - title: "Read environmental temperature"
    commands:
      - "read temperature"
    description: ""
  - title: "Read barometric pressure"
    commands:
      - "read pressure"
    description: ""
  - title: "Read relative humidity"
    commands:
      - "read humidity"
    description: ""
  - title: "Calibrate temperature reading"
    commands:
      - "write calibration.temperature.offset=0.5"
      - "write calibration.temperature.scale=1.01"
    description: "After writing to the calibration parameters, the new temperature reading will be: 1.01*raw_reading+0.5"

teaser_images:
  - file: "top.jpg"
    title: "Sensor board top view"
    description: ""
  - file: "bottom.jpg"
    title: "Sensor board bottom view"
    description: ""


firmware:
    - version: "1.0"
      link: "exaberry.hex"

datasheets:
    - title: "GD32F150xx datasheet"
      link: "/devices/datasheets/GD32F150xx_Datasheet_Rev3.1.pdf"
    - title: "GD32F1x0 user manual"
      link: "/devices/datasheets/GD32F1x0_User_Manual_EN_v3.1.pdf"
    - title: "BMP280 pressure sensor datasheet"
      link: "/devices/documentation/7de673263d14/1.0/datasheets/bmp280.pdf"
    - title: "SHTC3 humidity and temperature sensor datasheet"
      link: "/devices/documentation/7de673263d14/1.0/datasheets/shtc3.pdf"

design_docs:
    - version: "1.0"
      bom: "BOM-exaberry.csv"
      pos: "POS-exaberry.csv"
      gerbers: "GERBER-exaberry.zip"
      schematic: "schematics.jpg"

---