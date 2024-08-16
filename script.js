"use strict";

const element = document.querySelectorAll(".num");
const interval = 10000;

element.forEach((el) => {
  let startValue = 0;
  const endValue = parseInt(el.getAttribute("data-val"));
  const duration = Math.floor(interval / endValue);

  const counter = setInterval(function () {
    startValue += 1;
    el.textContent = `PHP ${new Intl.NumberFormat("en-US").format(startValue)}`;
    if (startValue === endValue) clearInterval(counter);
  }, duration);
});
