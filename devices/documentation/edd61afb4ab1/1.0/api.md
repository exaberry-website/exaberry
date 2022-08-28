---
layout: device_api_document
title: Infrared thermometer
type_id: edd61afb4ab1
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
    - path: "temperature.unit={enum}"
      description: "Write to the temperature unit."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">enum</span>."
        - "The value of <span class=\"bg-light rounded command-var\">{enum}</span> should be one of <span class=\"bg-light rounded command-var\">{celsius, kelvin, fahrenheit}</span>."
 
    - path: "config.emissivity={float}"
      description: "Write to the object emissivity."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0.1, 1.0]</span>." 
    - path: "calibration.object.offset={float}"
      description: "Write to the object temperature linear calibration offset."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-300, 500]</span>."
      additional_description:      
 
    - path: "calibration.object.scale={float}"
      description: "Write to the object temperature linear calibration scale."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-10, 10]</span>."
      additional_description:      
 
    - path: "calibration.ambient.offset={float}"
      description: "Write to the ambient temperature linear calibration offset."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-300, 500]</span>."
      additional_description:      
 
    - path: "calibration.ambient.scale={float}"
      description: "Write to the ambient temperature linear calibration scale."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-10, 10]</span>."
      additional_description:      
 
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
  

  - verb: read
    properties:
    - path: "temperature.object"
      description: "Read the object temperature."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>." 
    - path: "temperature.ambient"
      description: "Read the ambient temperature."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>." 
    - path: "temperature.unit"
      description: "Read the temperature unit."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">enum</span>.The value can be one of <span class=\"bg-light rounded command-var\">{celsius, kelvin, fahrenheit}</span>." 
    - path: "config.emissivity"
      description: "Read the object emissivity."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0.1, 1.0]</span>." 
    - path: "history.[history_index].object"
      description: "Read the object temperature."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[history_index]</span> should be in the range of <span class=\"bg-light rounded command-var\">[1, 100]</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>." 
    - path: "history.[history_index].ambient"
      description: "Read the ambient temperature."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[history_index]</span> should be in the range of <span class=\"bg-light rounded command-var\">[1, 100]</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>." 
    - path: "calibration.object.offset"
      description: "Read the object temperature linear calibration offset."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-300, 500]</span>."
      additional_description:      
 
    - path: "calibration.object.scale"
      description: "Read the object temperature linear calibration scale."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-10, 10]</span>."
      additional_description:      
 
    - path: "calibration.ambient.offset"
      description: "Read the ambient temperature linear calibration offset."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-300, 500]</span>."
      additional_description:      
 
    - path: "calibration.ambient.scale"
      description: "Read the ambient temperature linear calibration scale."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[-10, 10]</span>."
      additional_description:      
 
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
  - "supported units: celsius, kelvin and fahrenheit"
  - "100 measurement history"
  - "object temperature range: -70 celsius to 380 celsius"
  - "ambient temperature reading"
  - "resolution: 0.5 celsius"
  - "adjustable object emissivity"

dims:
  - name: "A"
    value: "17.0mm"
  - name: "B"
    value: "35.3mm"
  - name: "C"
    value: "12.0mm"
  - name: "D"
    value: "29.5mm"
  - name: "E"
    value: "2.54mm"

examples:
  - title: "Read temperatures"
    commands:
      - "read temperature"
    description: "This command will print ambient temperature, object temperature and the temperature unit"
  - title: "Change temperatures"
    commands:
      - "write temperature.unit=kelvin"
    description: "This command changes the temperature unit to be kelvin"
  - title: "Read the latest temperature reading from history"
    commands:
      - "read history.1"
    description: "The history.1 is always the lastest reading and history.100 is the oldest reading, if there is any."

teaser_images:
  - file: "top.jpg"
    title: "Infrared thermometer top view"
    description: ""
  - file: "bottom.jpg"
    title: "Infrared thermometer bottom view"
    description: ""


firmware:
    - version: "1.0"
      link: "exaberry.hex"

datasheets:
    - title: "GD32F150xx datasheet"
      link: "/devices/datasheets/GD32F150xx_Datasheet_Rev3.1.pdf"
    - title: "GD32F1x0 user manual"
      link: "/devices/datasheets/GD32F1x0_User_Manual_EN_v3.1.pdf"
    - title: "MLX90614 datasheet"
      link: "/devices/documentation/edd61afb4ab1/1.0/datasheets/MLX90614.pdf"

design_docs:
    - version: "1.0"
      bom: "BOM-exaberry.csv"
      pos: "POS-exaberry.csv"
      gerbers: "GERBERS-exaberry.zip"
      schematic: "schematics.jpg"

---