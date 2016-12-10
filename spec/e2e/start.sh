echo '* building the app'
webpack -p

echo '* running specs'
wdio ./spec/e2e/wdio.conf.js
