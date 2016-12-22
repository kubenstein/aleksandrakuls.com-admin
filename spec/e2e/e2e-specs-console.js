const blessed = require('blessed');
const Grid = require('blessed-contrib').grid;
const Log = require('blessed-contrib').log;
const spawn = require('child_process').spawn;

const screen = blessed.screen();
const screenGrid = new Grid({ rows: 4, cols: 2, screen: screen });

const specWindow = screenGrid.set(0, 0, 2, 2, Log, {
  fg: 'blue',
  label: ' Spec Runner ',
});

const backendWindow = screenGrid.set(2, 0, 2, 1, Log, {
  fg: 'green',
  label: ' Backend Server ',
});

const frontendWindow = screenGrid.set(2, 1, 1, 1, Log, {
  fg: 'cyan',
  label: ' Webpack Dev Server ',
});

const dbWindow = screenGrid.set(3, 1, 1, 1, Log, {
  fg: 'magenta',
  label: ' MongoDB Server ',
});

screen.render();

setTimeout(() => {
  writeToWindow(specWindow, 'npm', ['run', 'tests:e2e:spec-runner']);
}, 10000);
writeToWindow(frontendWindow, 'npm', ['run', 'tests:e2e:frontend']);
writeToWindow(backendWindow, 'npm', ['run', 'tests:e2e:backend']);
writeToWindow(dbWindow, 'npm', ['run', 'tests:e2e:db']);


// private

function writeToWindow(window, cmd, cmdArgs) {
  const proc = spawn(cmd, cmdArgs);
  proc.stdout.on('data', (data) => { writeStreamDataToWindow(window, data); });
  proc.stderr.on('data', (data) => { writeStreamDataToWindow(window, data); });
}

function writeStreamDataToWindow(window, data) {
  const lines = data.toString().split('\n');

  for (let i = 0; i < lines.length; i += 1) {
    window.log(lines[i]);
  }
}
