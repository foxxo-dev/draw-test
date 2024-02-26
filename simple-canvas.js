var color = 'white';
function createAndInit() {
  var canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style = 'width: 100vw; height: 100vh;';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  return ctx;
}

function initCanvas(canvasDOM) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvasDOM.getContect('2d');
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  return ctx;
}

function clear(ctx, bg) {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function createRect(ctx, width, height, posX, posY) {
  ctx.fillStyle = color;
  console.log(
    'Creating rectangle with width and height of',
    width,
    '/',
    height,
    'at position',
    posX,
    '/',
    posY
  );
  ctx.fillRect(posX, posY, width, height);
}

function addDraw(ctx, bg, clr) {
  var isMouseDown = false;
  color = clr;
  clear(ctx, bg);
  createRect(ctx, 5, 5, 0, 0);

  window.addEventListener('mousedown', () => {
    isMouseDown = true;
  });
  window.addEventListener('mouseup', () => {
    isMouseDown = false;
  });
  window.addEventListener('mousemove', (e) => {
    if (isMouseDown == false) return;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    createRect(ctx, 10, 10, mouseX, mouseY);
  });
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function createText(ctx, posX, posY) {
  console.log(posY, window.innerHeight - 50);
  if (posY > window.innerHeight - 150) {
    console.log('TOO FAR DOWN');
    return;
  }
  const input = document.createElement('input');
  input.style = `all: unset; position: fixed; left: ${posX}px; top: ${posY}px; width: max-content; text-wrap: no-wrap; color: ${color};`;
  input.id = 'TEMPORARY_DRAW_TOOL_TEXT_INPUT';
  document.body.appendChild(input);
  input.focus();
  input.focus = true;
  input.select();
  input.tabIndex = 0;
  ctx.fillStyle = color;
  input.addEventListener('change', () => {
    const val = input.value;
    input.remove();
    ctx.fillText(val, posX, posY);
  });
}
