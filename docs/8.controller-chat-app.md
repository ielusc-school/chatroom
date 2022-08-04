1. Acesse o arquivo `app.js` e adicione o script abaixo:

```js

// parametrizar a porta de acesso do app
const server = app.listen(5000, () => {
  console.log('server up ===>  http://localhost:5000')
});

const io = require('socket.io')(server);

// configurando uma variavel global pelo express para usarmos o io em qualquer contexto do nosso servidor.
app.set('io', io);

// adicionar uma conexão com websocket
io.on('connection', (socket) => {
  console.log('Usuário entrou na sala.');

  socket.on('disconnect', () => {
    console.log('Usuário saiu da sala.');
  })

  socket.on('msgParaServidor', (data) => {
    // notificando apenas o usuário
    socket.emit('msgParaCliente', { 
        apelido: data.apelido, 
        mensagem: data.mensagem,
      }
    );

    // notificando todos os usuários
    socket.broadcast.emit('msgParaCliente', { 
      apelido: data.apelido, 
      mensagem: data.mensagem,
    }
  );

  });
});

```
2. Vamos fazer o ajuste no controller, para isso acesse, `app/controllers/chat.js` e adicione o script abaixo:

```js
  // disparando a mensagem  pelo evento `msgParaCliente`
  application.get('io').emit(
    'msgParaCliente', 
    {
      apelido: dadosForm.apelido, 
      mensagem: 'Entrou no chat'
    } 
  );
```
