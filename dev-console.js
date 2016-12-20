const blessed = require('blessed');
const elements = require('blessed-contrib');
const spawn = require('child_process').spawn;

const screen = blessed.screen();
grid = new elements.grid({rows: 4, cols: 2, screen: screen})
screen.render();

const frontendWindow = grid.set(3, 0, 1, 1, elements.log, {
  fg: 'cyan',
  label: ' Webpack Dev Server ',
});

const backendWindow = grid.set(3, 1, 1, 1, elements.log, {
  fg: 'green',
  label: ' Backend Server ',
});

const linterWindow = grid.set(0, 0, 3, 2, elements.log, {
  fg: 'blue',
  label: ' Linter ',
});

writeToWindow(frontendWindow, 'npm', ['run', 'dev:frontend']);
writeToWindow(backendWindow, 'npm', ['run', 'dev:backend']);
writeToWindow(linterWindow, 'npm', ['run', 'dev:linter:ci']);


// private

function writeToWindow(window, cmd, cmdArgs) {
  const proc = spawn(cmd, cmdArgs);
  proc.stdout.on('data', (data) => { writeStreamDataToWindow(window, data) });
  proc.stderr.on('data', (data) => { writeStreamDataToWindow(window, data) });
}

function writeStreamDataToWindow(window, data) {
  var str = data.toString();
  var lines = str.split("\n");

  for(var i=0; i<lines.length; i++) {
    window.log(lines[i]);
  }
}