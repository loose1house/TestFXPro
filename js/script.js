let offset = 0;
let isDelayed = false;
const sliderLine = document.querySelector(".swap_block-contaiter");
const sliderElLine = document.querySelector(".swap_block-el");
const lengthOfSlider = sliderLine.clientWidth;
var lengthOfSliding = sliderElLine.clientWidth;
const dotIndicatorLeft = document.querySelector(".ind_left");
const dotIndicatorCenter = document.querySelector(".ind_center");
const dotIndicatorRight = document.querySelector(".ind_right");

window.addEventListener(
  "resize",
  () => {
    lengthOfSliding = sliderElLine.clientWidth;
    offset = 0;
  },
  false
);

function activitingIndicator() {
  if (offset == 0) {
    dotIndicatorLeft.role = "";
    dotIndicatorCenter.role = "active";
    dotIndicatorRight.role = "";
  }
  if (offset > 0) {
    dotIndicatorLeft.role = "active";
    dotIndicatorCenter.role = "";
    dotIndicatorRight.role = "";
  }
  if (offset < 0) {
    dotIndicatorLeft.role = "";
    dotIndicatorCenter.role = "";
    dotIndicatorRight.role = "active";
  }
}

function swipeRight() {
  offset = offset + lengthOfSliding;
  if (offset > lengthOfSliding) {
    offset = 0;
  }
  sliderLine.style.left = offset + "px";
  activitingIndicator();
}
function swipeLeft() {
  offset = offset - lengthOfSliding;
  if (-offset > lengthOfSliding) {
    offset = 0;
  }
  offset = -offset;
  sliderLine.style.left = -offset + "px";
  offset = -offset;
  activitingIndicator();
}

document.querySelectorAll(".swap_block_btn-next").forEach((element) => {
  element.onclick = () => {
    swipeRight();
  };
});

document.querySelectorAll(".swap_block_btn-prev").forEach((element) => {
  element.onclick = () => {
    swipeLeft();
  };
});

document.querySelectorAll(".swap_block_btn-center").forEach((element) => {
  element.onclick = () => {
    if (offset == lengthOfSliding) {
      sliderLine.style.left = offset - lengthOfSliding + "px";
    } else if (offset < lengthOfSliding && offset != 0) {
      sliderLine.style.left = offset + lengthOfSliding + "px";
    }
    offset = 0;
    activitingIndicator();
  };
});

sliderLine.addEventListener("touchstart", function (e) {
  TouchStart(e);
});
sliderLine.addEventListener("touchmove", function (e) {
  TouchMove(e);
});

sliderLine.addEventListener("touchend", function (e) {
  TouchEnd(e, "green");
});

var touchStart = null;
var touchPosition = null;
const sensitivity = 20;
function TouchStart(e) {
  touchStart = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
  touchPosition = { x: touchStart.x, y: touchStart.y };
}

function TouchMove(e) {
  touchPosition = {
    x: e.changedTouches[0].clientX,
    y: e.changedTouches[0].clientY,
  };
}

function TouchEnd() {
  if (touchStart.x - touchPosition.x > 30) {
    swipeLeft();
  } else {
    swipeRight();
  }

  touchStart = null;
  touchPosition = null;
}
