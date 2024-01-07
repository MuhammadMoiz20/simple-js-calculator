var display = document.getElementById('display');
var current = '';

function press(k) {
  if (k === '=') return;
  current += k;
  display.textContent = current;
}
