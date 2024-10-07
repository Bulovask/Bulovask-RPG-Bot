require('dotenv').config();
const bot = require('./config/bot');
const { FICHASPERSONAGENS, AREADECRIACAO } = require('./config/topicos');

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if(!bot.validarChat(msg)) return;

  bot.seTopico(msg, FICHASPERSONAGENS, msg => {
    const mensagem = `AVISO!\n<a href='tg://user?id=${msg.from.id}'>@${msg.from.username}</a>, ` +
    'não lhe é permitido enviar mensagens no tópico Fichas de Personagem.';

    bot.deleteMessage(msg.chat.id, msg.message_id);
    bot.sendMessage(msg.chat.id, mensagem, { parse_mode: 'html' });
  });

  bot.seTopicoETexto(msg, AREADECRIACAO, '/novo_personagem', msg => {
    bot.sendMessage(chatId, 'Ótimo! Vamos criar seu personagem kkk', {message_thread_id: msg.message_thread_id});
  });

  // console.log(msg.message_thread_id);
 
  // if (msg.text === '/jogar') {
  //     bot.sendMessage(chatId, 'A partida começou!');
  // }
});

// Tratar erros
bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.code} - ${error.message}`);
});