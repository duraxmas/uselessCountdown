const elements = {
  day: document.getElementById("days"),
  min: document.getElementById("minutes"),
  sec: document.getElementById("seconds"),
  hour: document.getElementById("hours"),
}

const finishTime = new Date("July 14, 2034 12:00:00").getTime()

setInterval(() => {
  const nowTime = new Date().getTime();
  const diff = finishTime - nowTime;

  const currentDiff = calcTime(diff);
  renderTime(currentDiff, elements)
}, 1000);

function calcTime(time) {

  const calculated = {
    day: Math.floor(time / (1000 * 60 * 60 * 24)),
    hour: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    min: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
    sec: Math.floor((time % (1000 * 60)) / 1000),
  }

  return calculated;
}

function renderTime(values, elements) {
  Object.keys(values).forEach(key => {
    const segment = elements[key].querySelector(".segment")
    elements[key].querySelector(".timer__value").innerText = values[key];
    changeCircleSegment(segment, key, values[key]);

    ///cringe
    if (elements["day"].querySelector(".timer__value").innerText.split('').length > 3) elements["day"].querySelector(".timer__value").style.fontSize = 35 + "px"
  })
}

function changeCircleSegment(elem, key, value) {
  if (key == "min" || key == "sec") elem.style.strokeDasharray = value + " 60";
  if (key == "hour") elem.style.strokeDasharray = 60 / 24 * value + " 60";
  if (key == "day") elem.style.strokeDasharray = 60 / 365 * value + " 60";
  if (value == 0) elem.style.strokeLinecap = "butt";
}
