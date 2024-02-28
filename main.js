var lastSelected = 'pen';

if (localStorage.getItem('lastSelected') == null) {
  localStorage.setItem('lastSelected', lastSelected);
}

lastSelected = localStorage.getItem('lastSelected');

function updateSelected(tool) {
  localStorage.setItem('lastSelected', tool);
  lastSelected = tool;
  tool = lastSelected;
}

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

var isMouseDown = false;
var clr_choise = document.getElementById('clr');
var color = 'white';
var pre_erase = color;
var tool = 'pen';
var pos1 = null;
var pos2 = null;

tool = lastSelected;

if (tool == 'pen') {
  document.getElementById('penTool').classList.add('selected');
  document.getElementById('rectTool').classList.remove('selected');
  document.getElementById('textTool').classList.remove('selected');
  document.getElementById('eraserTool').classList.remove('selected');
} else if (tool == 'rect') {
  document.getElementById('penTool').classList.remove('selected');
  document.getElementById('rectTool').classList.add('selected');
  document.getElementById('textTool').classList.remove('selected');
  document.getElementById('eraserTool').classList.remove('selected');
} else if (tool == 'text') {
  document.getElementById('penTool').classList.remove('selected');
  document.getElementById('rectTool').classList.remove('selected');
  document.getElementById('textTool').classList.add('selected');
  document.getElementById('eraserTool').classList.remove('selected');
} else if (tool == 'eraser') {
  document.getElementById('penTool').classList.remove('selected');
  document.getElementById('rectTool').classList.remove('selected');
  document.getElementById('textTool').classList.remove('selected');
  document.getElementById('eraserTool').classList.add('selected');
}

document.getElementById('penTool').addEventListener('click', () => {
  tool = 'pen';
  document.getElementById('penTool').classList.add('selected');
  document.getElementById('rectTool').classList.remove('selected');
  document.getElementById('textTool').classList.remove('selected');
  document.getElementById('eraserTool').classList.remove('selected');
  updateSelected('pen');
});
document.getElementById('rectTool').addEventListener('click', () => {
  tool = 'rect';
  document.getElementById('penTool').classList.remove('selected');
  document.getElementById('rectTool').classList.add('selected');
  document.getElementById('textTool').classList.remove('selected');
  document.getElementById('eraserTool').classList.remove('selected');
  updateSelected('rect');
});
document.getElementById('textTool').addEventListener('click', () => {
  tool = 'text';
  document.getElementById('penTool').classList.remove('selected');
  document.getElementById('rectTool').classList.remove('selected');
  document.getElementById('textTool').classList.add('selected');
  document.getElementById('eraserTool').classList.remove('selected');
  updateSelected('text');
});

document.getElementById('eraserTool').addEventListener('click', () => {
  tool = 'eraser';
  document.getElementById('penTool').classList.remove('selected');
  document.getElementById('rectTool').classList.remove('selected');
  document.getElementById('textTool').classList.remove('selected');
  document.getElementById('eraserTool').classList.add('selected');
  updateSelected('eraser');
});

document.getElementById('clear').addEventListener('click', () => {
  clear(ctx, '#333333');
});
function createText(ctx, posX, posY) {
  console.log(posY, window.innerHeight - 50);
  if (posY > window.innerHeight - 150) {
    console.log('TOO FAR DOWN');
    return;
  }
  if (document.getElementById('TEMPORARY_DRAW_TOOL_TEXT_INPUT') !== null) {
    return;
  }
  const input = document.createElement('input');
  input.style = `all: unset; position: fixed; left: ${posX}px; top: calc(${posY}px - 0.25rem); text-wrap: no-wrap; color: ${color}; outline: 3px dashed red; outline-offset: 3px;`;
  input.id = 'TEMPORARY_DRAW_TOOL_TEXT_INPUT';
  input.placeholder = 'Your Text';
  document.body.appendChild(input);
  input.focus();
  input.focus = true;
  input.select();
  input.tabIndex = 0;
  input.draggable = true;
  ctx.fillStyle = color;
  input.addEventListener('change', () => {
    const val = input.value;
    input.remove();
    ctx.fillText(val, posX, posY);
  });
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

function createCircle(ctx, radius, posX, posY, customColor) {
  ctx.fillStyle = color;
  if (customColor) {
    ctx.fillStyle = customColor;
  }
  // ctx.fillRect(posX, posY, width, height);
  ctx.beginPath();
  ctx.arc(posX, posY, radius, 0, 2 * Math.PI);
  ctx.fill();
}
function clear(ctx, bg) {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

var canvas = document.createElement('canvas');
canvas.id = 'cnvs';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

clear(ctx, '#333333');

ctx.font = 22;

window.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  if (tool == 'text') {
    createText(ctx, e.clientX, e.clientY);
  }
});
window.addEventListener('mouseup', (e) => {
  isMouseDown = false;
  if (pos1 !== null) {
    pos2 = { x: e.clientX, y: e.clientY };

    const width = pos2.x - pos1.x;
    const height = pos2.y - pos1.y;
    createRect(ctx, width, height, pos1.x, pos1.y);
    pos1 = null;
  }
});
window.addEventListener('mousemove', (e) => {
  if (isMouseDown == false) return;
  console.log('MOUSE IS DOWN!');
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  if (tool == 'pen') {
    createCircle(ctx, 20, mouseX, mouseY);
  } else if (tool == 'eraser') {
    createCircle(ctx, 20, mouseX, mouseY, '#333333');
  } else if (tool == 'rect') {
    if (pos1 == null) {
      pos1 = { x: mouseX, y: mouseY };
    }
  }
});
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  clear(ctx, '#333333');
});
clr_choise.addEventListener('change', () => {
  const val = clr_choise.value;
  color = val;
  pre_erase = color;
});

document.getElementById('save').addEventListener('click', () => {
  const url = canvas.toDataURL('png', 720);
  document.getElementById('overlay').src = url;
  const randomNumber = Math.floor(Math.random() * 100000);
  downloadURI(url, `your-drawing-by-@foxxo-#${randomNumber}.png`);
});
