---
layout: device_api_document
title: Controller board
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
  - name: GPIO voltage
    value: 3.3V


links:
  - text: "Exaberry"
    url: "https://www.exaberry.org"
  - text: "Getting Started"
    url: "https://www.exaberry.org/getting_started"
  - text: "General Specifications"
    url: "https://www.exaberry.org/specifications"
verbs:
  - verb: read
    properties:
    - path: "gpio.[gpio_pins].value"
      description: "Read the GPIO pin logic value."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[gpio_pins]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>."
      additional_description:     
 
    - path: "gpio.[gpio_pins].mode"
      description: "Read the GPIO I/O mode."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[gpio_pins]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">enum</span>.The value can be one of <span class=\"bg-light rounded command-var\">{input, output}</span>." 
    - path: "dac.[dac_pin].value"
      description: "Read the digital output value of the Digital-Analog-Converter (DAC)."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[dac_pin]</span> is <span class=\"bg-light rounded command-var\">{11}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 4095]</span>." 
    - path: "dac.[dac_pin].mode"
      description: "Read the DAC mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[dac_pin]</span> is <span class=\"bg-light rounded command-var\">{11}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>." 
    - path: "adc.[adc_pin].value"
      description: "Read the the digital input value of the Analog-Digital-Converter (ADC)."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[adc_pin]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 9, 10, 11, 12, 13, 14, 15, 16}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>." 
    - path: "adc.[adc_pin].mode"
      description: "Read the ADC mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[adc_pin]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 9, 10, 11, 12, 13, 14, 15, 16}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>." 
    - path: "pwm1.period"
      description: "Read the PWM 1 period counter."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 4294967295]</span>." 
    - path: "pwm1.prescaler"
      description: "Read the PWM 1 period prescaler."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 65535]</span>." 
    - path: "pwm1.[pwm1_pin].duty"
      description: "Read the PWM 1 output duty percentage."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm1_pin]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 9, 10}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 1]</span>." 
    - path: "pwm1.[pwm1_pin].mode"
      description: "Read the PWM 1 mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm1_pin]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 9, 10}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>." 
    - path: "pwm2.period"
      description: "Read the PWM 2 period counter."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 65535]</span>." 
    - path: "pwm2.prescaler"
      description: "Read the PWM 2 period prescaler."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 65535]</span>." 
    - path: "pwm2.[pwm2_pin].duty"
      description: "Read the PWM 2 output duty percentage."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm2_pin]</span> is one of <span class=\"bg-light rounded command-var\">{13, 14}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 1]</span>." 
    - path: "pwm2.[pwm2_pin].mode"
      description: "Read the PWM 2 mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm2_pin]</span> is one of <span class=\"bg-light rounded command-var\">{13, 14}</span>."
        - "The output data type is <span class=\"bg-light rounded command-var\">bool</span>." 
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
 
    - path: "device.systick"
      description: "Read the system ticks since powered up."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">uint</span>."
      additional_description:     
 
    - path: "device.id"
      description: "Read the device ID."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">hex</span>."
      additional_description:     
 
    - path: "device.type_id"
      description: "Read the type ID of the device."
      var_explanations:
        - "The output data type is <span class=\"bg-light rounded command-var\">string</span>."
      additional_description:     
 
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
  
  - verb: write
    properties:
    - path: "gpio.[gpio_pins].value={bool}"
      description: "Write to the GPIO pin logic value."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[gpio_pins]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
      additional_description:     
 
    - path: "gpio.[gpio_pins].mode={enum}"
      description: "Write to the GPIO I/O mode."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[gpio_pins]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">enum</span>."
        - "The value of <span class=\"bg-light rounded command-var\">{enum}</span> should be one of <span class=\"bg-light rounded command-var\">{input, output}</span>."
 
    - path: "dac.[dac_pin].value={uint}"
      description: "Write to the digital output value of the Digital-Analog-Converter (DAC)."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[dac_pin]</span> is <span class=\"bg-light rounded command-var\">{11}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 4095]</span>." 
    - path: "dac.[dac_pin].mode={bool}"
      description: "Write to the DAC mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[dac_pin]</span> is <span class=\"bg-light rounded command-var\">{11}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>." 
    - path: "adc.[adc_pin].mode={bool}"
      description: "Write to the ADC mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[adc_pin]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 9, 10, 11, 12, 13, 14, 15, 16}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>." 
    - path: "pwm1.period={uint}"
      description: "Write to the PWM 1 period counter."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 4294967295]</span>." 
    - path: "pwm1.prescaler={uint}"
      description: "Write to the PWM 1 period prescaler."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 65535]</span>." 
    - path: "pwm1.[pwm1_pin].duty={float}"
      description: "Write to the PWM 1 output duty percentage."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm1_pin]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 9, 10}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 1]</span>." 
    - path: "pwm1.[pwm1_pin].mode={bool}"
      description: "Write to the PWM 1 mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm1_pin]</span> is one of <span class=\"bg-light rounded command-var\">{1, 2, 9, 10}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>." 
    - path: "pwm2.period={uint}"
      description: "Write to the PWM 2 period counter."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 65535]</span>." 
    - path: "pwm2.prescaler={uint}"
      description: "Write to the PWM 2 period prescaler."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">uint</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[1, 65535]</span>." 
    - path: "pwm2.[pwm2_pin].duty={float}"
      description: "Write to the PWM 2 output duty percentage."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm2_pin]</span> is one of <span class=\"bg-light rounded command-var\">{13, 14}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">float</span>."
        - "The value range of this property is <span class=\"bg-light rounded command-var\">[0, 1]</span>." 
    - path: "pwm2.[pwm2_pin].mode={bool}"
      description: "Write to the PWM 2 mode of on/off."
      var_explanations:
        - "<span class=\"bg-light rounded command-var\">[pwm2_pin]</span> is one of <span class=\"bg-light rounded command-var\">{13, 14}</span>."
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>." 
    - path: "config.save={bool}"
      description: "Write to the switch of saving current configuration."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">config.save</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write config.save</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write config.save=True</span>"
      additional_description:
        - "Save the current configuration of all pins to internal nonvolatile memory. The save config will be automatically loaded and applied at power up."     
 
    - path: "config.load={bool}"
      description: "Write to the switch of loading previously saved configuration."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">config.load</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write config.load</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write config.load=True</span>"
      additional_description: 
        - "Load previously saved configuration and apply the configuration to pins."    
 
    - path: "config.reset={bool}"
      description: "Write to the switch of resetting configuration to default value."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">config.reset</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write config.reset</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write config.reset=True</span>"
      additional_description:  
        - "Reset the saved configuration to its default value."   
 
    - path: "device.restart={bool}"
      description: "Write to the switch of restarting the device."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">bool</span>."
        - "The default value of <span class=\"bg-light rounded command-var\">device.restart</span> is <span class=\"bg-light rounded command-var\">True</span>. <span class=\"bg-light rounded command-var\">&gt; write device.restart</span> is equivalent to <span class=\"bg-light rounded command-var\">&gt; write device.restart=True</span>"
      additional_description:     
 
    - path: "device.name={string}"
      description: "Write to the name of the device."
      var_explanations:
        - "The input data type is<span class=\"bg-light rounded command-var\">string</span>."
        - "The length of the <span class=\"bg-light rounded command-var\">{string}</span> should be less than 16."
      additional_description:     
  


features:
  - "General Purpose Input Out (GPIO)"
  - "Digital-to-Analog Converter (DAC)"
  - "Analog-to-Digital Converter (ADC)"
  - "Power Width Modulation (PWM)"
  - "Save/load configuration to/from internal nonvolatile memory"

dims:
  - name: "A"
    value: "2mm"
  - name: "B"
    value: "2.54mm"
  - name: "C"
    value: "38.5mm"
  - name: "D"
    value: "12mm"
  - name: "E"
    value: "7.62mm"

examples:
  - title: "Set GPIO value"
    commands:
      - "write gpio.1.mode=ouput"
      - "write gpio.1.value=1"
    description: "To update the GPIO pin value, first set the GPIO mode to be <i>outoput</i> and then update the pin value to be the desired value."
  - title: "Read GPIO value"
    commands:
      - "write gpio.1.mode=input"
      - "read gpio.1.value"
    description: "To read the GPIO pin value, set the GPIO mode to be <i>input</i> and then read pin value."
  - title: "Read ADC input value"
    commands:
      - "write adc.1.mode=on"
      - "read adc.1.value"
    description: "Turn on the Analog-to-Digital Converter (ADC) on pin 1 and then read the converted digital value of the voltage on pin 1. The allowed voltage range on an ADC pin should be from 0V to 3.3V"
  - title: "Analog output by DAC"
    commands:
      - "write dac.11.mode=on"
      - "write dac.11.value=1000"
    description: "Turn on the Digital-to-Analog Converter (DAC) on pin 11. Write the output value to the DAC. The DAC will convert the given digital value to a voltage in the range from 0V to 3.3V on the pin 11. The range of the digital value should be from 0 to 4095."
  - title: "Set PWM output"
    commands:
      - "write pwm1.period=1024"
      - "write pwm1.prescaler=1"
      - "write pwm1.1.duty=0.5"
      - "write pwm1.1.mode=on"
    description: "<i>pwm1.period</i> defines the period counter of PWM 1. <i>pwm1.prescale</i> is the prescaler of the PWM 1 clock. The period of output wave is defined by both the period counter and the prescaler. <i>pwm1.1.duty=0.5</i> makes the output wave 50% high and 50% low. Finally, turn on the output on pin 1 by setting the mode to be <i>on</i>"
  - title: "Save current configuration"
    commands:
      - "write config.save"
    description: "Save the current configuration on all pins to internal nonvolatile memory. The saved configuration will be automatically loaded on next power up."
  - title: "Load saved configuration"
    commands:
      - "write config.load"
    description: "Load the previously saved configuration and apply the configuration to all pins."

teaser_images:
  - file: "top.jpg"
    title: "GPIO board top view"
    description: ""
  - file: "bottom.jpg"
    title: "GPIO board bottom view"
    description: ""

introduction:
  - text: ""
    image:
      file: "pins.JPG"
      title: "Pin function map"

---