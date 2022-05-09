---
layout: device_api_document
title: Power Relay
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
    - path: "step.[step_index].state={bool}"
      description: "Write to the state of the switch."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[step_index]</span> should be in the range of <span class=\"bg-light rounded command-var\">[1, 50]</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
      additional_description:      
        - "The updated value of the step's state will take effect the next time this step is current."         
 
    - path: "step.[step_index].delay={uint}"
      description: "Write to the delay of the current step in microseconds."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[step_index]</span> should be in the range of <span class=\"bg-light rounded command-var\">[1, 50]</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 2147483647]</span>."
      additional_description:       
        - "The updated value of the step's delay will take effect the next time this step is current."        
 
    - path: "process.mode={enum}"
      description: "Write to the process execution mode."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">enum</span>."
        - "The value of <span class=\"bg-light rounded command-var\">{enum}</span> should be one of <span class=\"bg-light rounded command-var\">{cyclic, once}</span>."
 
    - path: "process.end_step={uint}"
      description: "Write to the end step index (inclusive) of the process to run."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 50]</span>."
      additional_description:     
        - "The updated value of <i>end_step</i> will take effect at the process restart or running process step change."          
 
    - path: "process.run={bool}"
      description: "Write to the run flag."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">process.run</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write process.run</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write process.run=True</span>"
      additional_description:        
        - "The relay will come back to off state after the process finishes."       
 
    - path: "process.restart={bool}"
      description: "Write to the flag to restart the process."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">process.restart</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write process.restart</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write process.restart=True</span>" 
    - path: "state={bool}"
      description: "Write to the current state of the switch."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
      additional_description:
        - "Writing to the <i>state</i> property will pause any running process."               
 
    - path: "on={bool}"
      description: "Write to the flag to turn on the switch."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">on</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write on</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write on=True</span>"
      additional_description: 
        - "Writing to the <i>on</i> property will pause any running process."              
 
    - path: "off={bool}"
      description: "Write to the flag to turn off the switch."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">off</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write off</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write off=True</span>"
      additional_description:  
        - "Writing to the <i>off</i> property will pause any running process."             
 
    - path: "toggle={bool}"
      description: "Write to the flag to toggle the switch."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">toggle</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write toggle</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write toggle=True</span>"
      additional_description:   
        - "Writing to the <i>toggle</i> property will pause any running process."            
 
    - path: "calibration.timer.scale={float}"
      description: "Write to the scale coefficient of the delay timer."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0.5, 2]</span>." 
    - path: "config.normally={enum}"
      description: "Write to the normally state of the switch."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">enum</span>."
        - "The value of <span class=\"bg-light rounded command-var\">{enum}</span> should be one of <span class=\"bg-light rounded command-var\">{closed, open}</span>."

      additional_description:    
        - "Changing the <i>normally</i> property will change the state of the relay immediately."           
 
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
    - path: "step.[step_index].state"
      description: "Read the state of the switch."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[step_index]</span> should be in the range of <span class=\"bg-light rounded command-var\">[1, 50]</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>."
      additional_description:               
 
    - path: "step.[step_index].delay"
      description: "Read the delay of the current step in microseconds."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[step_index]</span> should be in the range of <span class=\"bg-light rounded command-var\">[1, 50]</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 2147483647]</span>."
      additional_description:               
 
    - path: "process.mode"
      description: "Read the process execution mode."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">enum</span>.The value can be one of <span class=\"bg-light rounded command-var\">{cyclic, once}</span>." 
    - path: "process.end_step"
      description: "Read the end step index (inclusive) of the process to run."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 50]</span>."
      additional_description:               
 
    - path: "process.run"
      description: "Read the run flag."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>."
      additional_description:               
 
    - path: "process.current_index"
      description: "Read the current step index."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>." 
    - path: "process.countdown"
      description: "Read the current step delay countdown."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>." 
    - path: "state"
      description: "Read the current state of the switch."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>."
      additional_description:               
 
    - path: "calibration.timer.scale"
      description: "Read the scale coefficient of the delay timer."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0.5, 2]</span>." 
    - path: "config.normally"
      description: "Read the normally state of the switch."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">enum</span>.The value can be one of <span class=\"bg-light rounded command-var\">{closed, open}</span>."
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
  - "Record up to 50 switch action steps"
  - "Run steps in cyclic or one-shot manner"
  - "24 days max delay for each step"
  - "1 microsecond min delay resolution for each step"
  - "Control switch on/off/toggle by command"
  - "Calibration for delay timer is available"

dims:
  - name: "A"
    value: "18mm"
  - name: "B"
    value: "64mm"
  - name: "C"
    value: "2mm"
  - name: "D"
    value: "12mm"
  - name: "E"
    value: "2.54mm"

examples:
  - title: "Switch on the relay"
    commands:
      - "write on"
    description: "Make sure you don't have recorded steps running. This command will interrupt the running recorded steps."
  - title: "Switch off the relay"
    commands:
      - "write off"
    description: "Make sure you don't have recorded steps running. This command will interrupt the running recorded steps."
  - title: "Toggle the relay"
    commands:
      - "write toggle"
    description: "Make sure you don't have recorded steps running. This command will interrupt the running recorded steps."
  - title: "Read current switch state"
    commands:
      - "read state"
    description: ""
  - title: "Set normal state of the switch to be closed"
    commands:
      - "write config.normally=closed"
    description: "If you connect the relay on <i>COM</i> and <i>NC</i>, then the default normally state of the relay is <i>closed</i>. <kbd>&gt; write on</kbd> will keep the relay closed. <kbd>&gt; write off</kbd> will activate the relay and open the switch."
  - title: "Set normal state of the switch to be open"
    commands:
      - "write config.normally=open"
    description: "If you connect the relay on <i>COM</i> and <i>NO</i>, then the default normally state of the relay is <i>open</i>. <kbd>&gt; write on</kbd> will activate the relay and close the switch. <kbd>&gt; write off</kbd> will keep the relay open."
  - title: "Repeatedly turn on the switch for 1s and then turn it off for 1s"
    commands:
      - "write step.1.state=on"
      - "write step.1.delay=1000"
      - "write step.2.state=off"
      - "write step.2.delay=1000"
      - "write process.end_step=2"
      - "write process.mode=cycle"
      - "write process.run"
    description: "Record 2 steps. Step 1 turns on the switch for 1s. Step 2 turns off the switch for 1s. Set the end step index of the process to be 2. A process is a sequence of steps to run. Use cyclic run mode. Finally, start to run the process."
  - title: "Pause the running process"
    commands:
      - "write process.run=false"
    description: "Interrupt the running steps. The steps will run from start, if you set the <i>step.run</i> to true again."
  - title: "Continue to run the current process"
    commands:
      - "write process.run=true"
    description: ""
  - title: "Restart the process"
    commands:
      - "write process.restart"
    description: ""
  - title: "Tune the delay timer to be 1% faster"
    commands:
      - "write calibration.timer.scale=1.01"
    description: ""
  - title: "Read current step index"
    commands:
      - "read process.current_index"
    description: "If you have recorded steps running, this command shows the index of the current step."
  - title: "Read current step delay countdown"
    commands:
      - "read process.countdown"
    description: "If you have recorded steps running, this command shows the delay countdown of the current step in microseconds. If the countdown reaches 0, the next step will start to run."

teaser_images:
  - file: "top.jpg"
    title: "Relay board top view"
    description: ""
  - file: "bottom.jpg"
    title: "Relay board bottom view"
    description: ""


firmware:
    - version: "1.0"
      link: "exaberry.hex"

datasheets:
    - title: "GD32F150xx datasheet"
      link: "/devices/datasheets/GD32F150xx_Datasheet_Rev3.1.pdf"
    - title: "GD32F1x0 user manual"
      link: "/devices/datasheets/GD32F1x0_User_Manual_EN_v3.1.pdf"

design_docs:
    - version: "1.0"
      bom: "fat_BOM.csv"
      pos: "fat_POS.csv"
      gerbers: "fat_gerber.zip"
      schematic: "schematic.jpg"

---