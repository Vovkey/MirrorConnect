const mouseDown = {
  card0: false,
};

const offset = {
  card0: [
    document.getElementById('card0').offsetWidth / 2,
    document.getElementById('card0').offsetHeight / 2,
  ]
};

var mouseX, mouseY;

document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

window.nodeGrab = function(target) {
  switch (target) {
    case 0:
      mouseDown.card0 = true;
      break;
  }
}

window.nodeDrop = function(target) {
  switch (target) {
    case 0:
      mouseDown.card0 = false;
      break;
  }
}

function updateCardPos() {
  if (mouseDown.card0) {
    card0.style.left = (mouseX - offset.card0[0]) + 'px';
    card0.style.top = (mouseY - offset.card0[1]) + 'px';
  }
  requestAnimationFrame(updateCardPos);
}

requestAnimationFrame(updateCardPos);
//
