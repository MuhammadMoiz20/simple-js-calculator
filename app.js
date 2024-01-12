var display = document.getElementById('display');
var current = '';

var OPS = ['+', '-', '*', '/'];

function compute(expr) {
  var tokens = expr.match(/(\d+\.?\d*|[+\-*/])/g);
  if (!tokens) return 0;
  var pass1 = [tokens[0]];
  for (var i = 1; i < tokens.length; i += 2) {
    var op = tokens[i];
    var n = tokens[i+1];
    if (op === '*' || op === '/') {
      var prev = parseFloat(pass1.pop());
      var cur = parseFloat(n);
      pass1.push(String(op === '*' ? prev * cur : prev / cur));
    } else {
      pass1.push(op);
      pass1.push(n);
    }
  }
  var val = parseFloat(pass1[0]);
  for (var j = 1; j < pass1.length; j += 2) {
    var op2 = pass1[j];
    var n2 = parseFloat(pass1[j+1]);
    if (op2 === '+') val += n2;
    else if (op2 === '-') val -= n2;
  }
  return val;
}

function render() {
  display.textContent = current || '0';
}

document.querySelector('.keys').addEventListener('click', function (e) {
  if (e.target.tagName !== 'BUTTON') return;
  var k = e.target.textContent;
  if (k === 'C') { current = ''; render(); return; }
  if (k === 'CE') { current = current.replace(/\d+\.?\d*$/, ''); render(); return; }
  if (k === '←') { current = current.slice(0, -1); render(); return; }
  if (k === '=') {
    current = String(compute(current));
    render();
    return;
  }
  if (k === '.') {
    var seg2 = current.split(/[+\-*/]/).pop();
    if (seg2.indexOf('.') !== -1) { return; }
    current += k; render(); return;
  }
  if (OPS.indexOf(k) !== -1 && OPS.indexOf(current.slice(-1)) !== -1) {
    current = current.slice(0, -1) + k;
  } else {
    current += k;
  }
  render();
});

document.addEventListener('keydown', function (e) {
  var k = e.key;
  if (/^[0-9.]$/.test(k)) {
    if (k === '.') {
      // dont allow two dots in current number
      var seg = current.split(/[+\-*/]/).pop();
      if (seg.indexOf('.') !== -1) return;
    }
    current += k; render();
  }
  else if (['+', '-', '*', '/'].indexOf(k) !== -1) {
    if (OPS.indexOf(current.slice(-1)) !== -1) current = current.slice(0, -1);
    current += k; render();
  }
  else if (k === 'Enter' || k === '=') {
    current = String(compute(current));
    render();
  }
  else if (k === 'Backspace') { current = current.slice(0, -1); render(); }
  else if (k === 'Escape') { current = ''; render(); }
});
