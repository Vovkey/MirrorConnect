# MirrorConnect

Currently it's just a html site with a lot of js magic and draggable widgets.

The vision is to make a DIY smart mirror with a rasberry pi, that hosts a network, which you can then connect to, with a second device and move around the widgets on the screen, so you never really have to connect to the rasberry after setup but can still customize it easily and fast.

Currently, for development im hosting it on nest. So if you want to demo it, either download the code and localhost it yourself, or shoot me a slack (dgmautner) dm so I can add you to the test users for the google API. (This is only necessary if you want to use the google Calendar widget)

<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

Here's a quick rundown of the current widgets, if you don't want to go through the trouble of demoing it.

1. Clock
  This is just a basic clock. Nothing more, nothing less. Just tells the time.
  Thinking about adding the weekday and the date aswell, but not right now.

2. Weather
  This is a weather widget. It displays the temperature and the weather for today and the forecast for the next few days. I'm really proud of the fading effect at the bottom. 

3. Calendar
  This was by far the most challenging widget. Even though, google offers an easy embedding feature for their calendar, I didn't use it, because it wasn't customizable at all. Instead, I created an entire google cloud web app with the OAuth screen and everything. I'm really happy with the minimalistic but yet so useful final product.

4. Bus Timer
  This is just a simple timer for me in the morning to know at a glance in the mirror when I'll have to leave.


P.S. Please don't mind the severe misspelling of calendar in my code.

P.P.S All future widgets will be added to this list
