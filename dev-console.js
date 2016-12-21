const blessed = require('blessed');
const elements = require('blessed-contrib');
const spawn = require('child_process').spawn;

const screen = blessed.screen();
grid = new elements.grid({rows: 4, cols: 2, screen: screen})

const linterWindow = grid.set(0, 0, 2, 2, elements.log, {
  fg: 'blue',
  label: ' Linter ',
});

const backendWindow = grid.set(2, 0, 2, 1, elements.log, {
  fg: 'green',
  label: ' Backend Server ',
});

const frontendWindow = grid.set(2, 1, 1, 1, elements.log, {
  fg: 'cyan',
  label: ' Webpack Dev Server ',
});

const dbWindow = grid.set(3, 1, 1, 1, elements.log, {
  fg: 'magenta',
  label: ' MongoDB Server ',
});

screen.render();

writeToWindow(frontendWindow, 'npm', ['run', 'dev:frontend']);
writeToWindow(backendWindow, 'npm', ['run', 'dev:backend']);
writeToWindow(linterWindow, 'npm', ['run', 'dev:linter:ci']);
writeToWindow(dbWindow, 'npm', ['run', 'dev:db']);


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