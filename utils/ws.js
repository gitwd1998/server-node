const WebSocker = require('ws').server
const ws = new WebSocker({ port: 9000 })
ws.on('connection', (ws) => {
  console.log('Hello WebSocker');
  setInterval(() => {
    ws.send('吼吼哈嘿')
  }, 5000);
})