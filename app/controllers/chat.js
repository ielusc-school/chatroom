module.exports.iniciaChat = (application, req, res) => {
  const dadosForm = req.body;
  console.log(dadosForm);

  req.assert('apelido', 'O campo apelido ou nome devem ser preenchido').notEmpty();
  req.assert('apelido', 'O campo apelido ou nome devem  conter de 3 a 15 caracteres').len(3,14);

  const erros = req.validationErrors();

  if(erros) {
    res.render('index', { validacao: erros });
    return;
  }

  application.get('io').emit('msgParaCliente', {
     apelido: dadosForm.apelido,
     mensagem: 'Entrou no chat'
  });

  
  res.render('chat', { dadosForm });
}