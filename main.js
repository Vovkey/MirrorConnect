const mouseDown = {
  clock0: false,
  weather0: false,
  calender0: false,
};

const offset = {
  clock0: [
    document.getElementById('clock0').offsetWidth / 2,
    document.getElementById('clock0').offsetHeight / 2,
  ],
  weather0: [
    document.getElementById('weather0').offsetWidth / 2,
    document.getElementById('weather0').offsetHeight / 2,
  ],
  calender0: [
    document.getElementById('calender0').offsetWidth / 2,
    document.getElementById('calender0').offsetHeight / 2,
  ],
};

var mouseX, mouseY;

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

window.nodeGrab = function(target) {
  switch (target) {
    case 0:
      mouseDown.clock0 = true;
      break;
    case 1:
      mouseDown.weather0 = true;
      break
    case 2:
      mouseDown.calender0 = true;
      break;

  }
}

window.nodeDrop = function(target) {
  switch (target) {
    case 0:
      mouseDown.clock0 = false;
      break;
    case 1:
      mouseDown.weather0 = false;
      break;
    case 2:
      mouseDown.calender0 = false;
      break;
  }
}

function updateClockPos() {
  if (mouseDown.clock0) {
    clock0.style.left = (mouseX - offset.clock0[0]) + 'px';
    clock0.style.top = (mouseY - offset.clock0[1]) + 'px';
  }
  requestAnimationFrame(updateClockPos);
}

function updateWeatherPos() {
  if (mouseDown.weather0) {
    weather0.style.left = (mouseX - offset.weather0[0]) + 'px';
    weather0.style.top = (mouseY - offset.weather0[1]) + 'px';
  }
  requestAnimationFrame(updateWeatherPos)
}

function updateCalenderPos() {
  if (mouseDown.calender0) {
    calender0.style.left = (mouseX - offset.calender0[0]) + 'px';
    calender0.style.top = (mouseY - offset.calender0[1]) + 'px';
  }
  requestAnimationFrame(updateCalenderPos)
}

requestAnimationFrame(updateCalenderPos)
requestAnimationFrame(updateClockPos);
requestAnimationFrame(updateWeatherPos);
//

function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock0').innerHTML = h + ":" + m + ":" + s;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };
  return i;
}
