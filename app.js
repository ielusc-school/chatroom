const app = require('./config/server');

const server = app.listen(5000, () => {
  console.log('app start => http://locahost:5000');
 });

const io = require('socket.io')(server);

// setando a variavel de socket io para que todo a minha app possa utilizar
app.set('io', io);

io.on('connection', (socket) => {
  console.log('ENTREI NA SALA');

  socket.on('disconnect', () => {
    console.log('SAIU DA SALA');
  });

  socket.on('msgParaServidor', (data) => {
    socket.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });  // erro estava aqui 

    socket.broadcast.emit('msgParaCliente', {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });
  });
});




