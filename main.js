// тут может находится ваш код
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var btnStart = document.querySelector("#start");
var btnStop = document.querySelector("#stop");
var score = document.querySelector('#score');
var scoreValue = 0;
var rects = [];
var timerId;

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function MakeRect() {
  this.x = Math.round(Math.random() * canvas.width - 20);
  if (this.x < 0 || this.x > canvas.width) this.x = 0;
  this.y = 0;
  this.color = getRandomColor();
  this.ySpeed = Math.round(Math.random() * 3) || 1;
}

btnStart.addEventListener("click", function(){
  if (!timerId) {
      timerId = setInterval(() => {
        rects.push(new MakeRect());
    }, 1000);
  }
});

btnStop.addEventListener("click", function(){
  clearInterval(timerId);
  timerId = undefined;
  rects = [];
  scoreValue = 0;
  score.innerHTML = `${scoreValue}`;
});

canvas.addEventListener('click', function(event) {
  var x = event.pageX - canvas.offsetLeft,
      y = event.pageY - canvas.offsetTop;
  rects.forEach(function(item, index) {
      if (+item.x + 20 >= x && +item.x <= x && +item.y + 20 >= y && +item.y <= y) {
          rects.splice(index, 1);
          scoreValue++;
          score.innerHTML = `${scoreValue}`;
      }
  });
}, false);

function draw() {
  rects.forEach(item => {
    ctx.beginPath();
    ctx.fillRect(item.x, item.y, 20, 20);
    ctx.fillStyle = '' + item.color;
    ctx.fill();
    ctx.closePath();
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  rects.forEach(item => {
    item.y += item.ySpeed;
  });
  // тут может находится ваш код
  requestAnimationFrame(animate);
}
// тут может находится ваш код

document.body.onload = animate;
