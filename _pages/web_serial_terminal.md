---
layout: default
title: Web Serial Terminal
js:
  - "/assets/js/serial-handler.js"
  - "/assets/js/term.js"
  - "/assets/js/widgets.js"
  - "/assets/js/terminal-widget.js"
---
<section class="web-serial-widget-title bg-primary position-relative">
  <div class="container">
    <div class="row">
      <div class="col-12 text-center p-4">
      </div>
    </div>
  </div>
</section>

<section class="section">
<div class="container">
    <div class="row">
      <div class="col-12 text-center">
            <div class="exaberry-widget-connect" data-exaberry='{"device":"exaberry device"}'>
                <p>
                <button type="button" class="btn btn-primary bg-primary exaberry-serial-connect-button">Connect</button>
                </p>
            </div>
      </div>
    </div>

    <div class="row">
        <div class="col-sm-12">
            <div class="exaberry-widget-message-box" data-exaberry='{"device":"exaberry device","maxMessageNumber":5}'>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="w-50 mx-auto">
            <div class="exaberry-widget-terminal" data-exaberry='{"device":"exaberry device", "bottom_padding":400}'></div>
        </div>
    </div>
</div>
</section>
