var display = document.getElementById('display');
var current = '';

var OPS = ['+', '-', '*', '/'];

function compute(expr) {
  // very small parser, left-to-right, no precedence yet
  var tokens = expr.match(/(\d+\.?\d*|[+\-*/])/g);
  if (!tokens) return 0;
  var val = parseFloat(tokens[0]);
  for (var i = 1; i < tokens.length; i += 2) {
    var op = tokens[i];
    var n = parseFloat(tokens[i+1]);
    if (op === '+') val += n;
    else if (op === '-') val -= n;
    else if (op === '*') val *= n;
    else if (op === '/') val /= n;
  }
  return val;
}

document.querySelector('.keys').addEventListener('click', function (e) {
  if (e.target.tagName !== 'BUTTON') return;
  var k = e.target.textContent;
  if (k === '=') {
    current = String(compute(current));
    display.textContent = current;
    return;
  }
  if (OPS.indexOf(k) !== -1 && OPS.indexOf(current.slice(-1)) !== -1) {
    current = current.slice(0, -1) + k;
  } else {
    current += k;
  }
  display.textContent = current || '0';
});
