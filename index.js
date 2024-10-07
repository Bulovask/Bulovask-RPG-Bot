require('dotenv').config();
const bot = require('./config/bot');
const { FICHASPERSONAGENS, AREADECRIACAO, EFEITOS, MAGIAS, ITENS, HISTORIAGERAL } = require('./config/topicos');
const amt = require('./controllers/apagarMensagensEmTopicos');
const personagem = require('./controllers/personagem');

const topicosRestritos = [
  FICHASPERSONAGENS,
  EFEITOS,
  MAGIAS,
  ITENS,
  HISTORIAGERAL
];

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if(!bot.validarChat(msg)) return;

  // Apagar últimas mensagens de usuários em certos tópicos
  bot.seTopico(msg, topicosRestritos, amt.apagarUltimaMensagem);

  bot.seTopicoETexto(msg, AREADECRIACAO, '/novo_personagem', personagem.novo);

  // console.log(msg.message_thread_id);
 
  // if (msg.text === '/jogar') {
  //     bot.sendMessage(chatId, 'A partida começou!');
  // }
});

// Tratar erros
bot.on('polling_error', (error) => {
  console.error(`Polling error: ${error.code} - ${error.message} - ${error.stack}`);
});