var display = document.getElementById('display');
var current = '';

var OPS = ['+', '-', '*', '/'];

document.querySelector('.keys').addEventListener('click', function (e) {
  if (e.target.tagName !== 'BUTTON') return;
  var k = e.target.textContent;
  if (k === '=') {
    // TODO
    return;
  }
  // dont allow two ops in a row
  if (OPS.indexOf(k) !== -1 && OPS.indexOf(current.slice(-1)) !== -1) {
    current = current.slice(0, -1) + k;
  } else {
    current += k;
  }
  display.textContent = current || '0';
});
