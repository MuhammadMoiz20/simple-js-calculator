// using one listener instead of inline handlers
var display = document.getElementById('display');
var current = '';

document.querySelector('.keys').addEventListener('click', function (e) {
  if (e.target.tagName !== 'BUTTON') return;
  var k = e.target.textContent;
  if (k === '=') return;
  current += k;
  display.textContent = current;
});
