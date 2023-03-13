const { reverse } = require('dns');
const { createContext } = require('vm');

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let danhSachNguoiGui = []

let resXinChao = [
  'Xin Chao, Toi co the giup gi cho ban?',
  'Ban can toi giup gi hom nay?',
  'Rat vui duoc gap ban'
]

io.on('connection', (socket) => {
  danhSachNguoiGui.push({id: socket.id, dem: 0})
  socket.on('chat message', msg => {

    let tinNhanChuyenDoi = ''
    for (let i=0; i<msg.length; i++){
      if (msg[i] == 'y' && msg[i+1] == 'e' && msg[i+2] == 'u'){
        tinNhanChuyenDoi += '<3'
        i += 2
      }
      else{
        tinNhanChuyenDoi += msg[i]
      }
    }
    io.emit('chat message', tinNhanChuyenDoi)

  if (msg.includes("xin chao")){
    var a = Math.floor(Math.random() * resXinChao.length);
    io.emit('chat message', resXinChao[a]);
  }
  
  })
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
