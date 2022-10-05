const body = document.querySelector("body");
const squares = [];
var speed = 5;
const color_list = ["#A0A0A0", "#B0B0B0", "#C0C0C0", "#D0D0D0"];
function generate_direction() {
  let a = -1 + 2 * Math.random();
  if (a < 0) {
    return -1;
  } else {
    return 1;
  }
}

console.log(screen.height, screen.width);
for (let i = 0; i < 40; i++) {
  var color = color_list[Math.floor(4 * Math.random())];
  const x0 = 1800 * Math.random();
  const y0 = 800 * Math.random();
  const square_element = document.createElement("div");
  square_element.classList.add("dot");
  square_element.style = `top:${y0}px; left:${x0}px;`;
  square_element.style.backgroundColor = color;
  square_element.innerHTML = "";
  body.appendChild(square_element);

  squares.push({
    element: square_element,
    x: x0,
    y: y0,
    d_x: generate_direction(),
    d_y: generate_direction(),
  });
}
requestAnimationFrame(animationLoop);

function animationLoop(currentTime) {
  var speed = 3;

  // Translate all squares in x and y direction
  for (let k = 0; k < squares.length; k++) {
    const e = squares[k];
    if (e.y > 1025) {
      e.d_y = -Math.random() / 2 - 0.5;
    }
    if (e.y < 5) {
      e.d_y = Math.random() / 2 + 0.5;
    }
    if (e.x > 1865) {
      e.d_x = -Math.random() / 2 - 0.5;
    }
    if (e.x < 5) {
      e.d_x = Math.random() / 2 + 0.5;
    }

    e.y = e.y + e.d_y * speed;
    e.x = e.x + e.d_x * speed;
    e.element.style.top = `${e.y}px`;
    e.element.style.left = `${e.x}px`;
  }
  requestAnimationFrame(animationLoop);
}