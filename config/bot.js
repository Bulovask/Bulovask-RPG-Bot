const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN_API_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });

module.exports = bot;

module.exports.criandos = {}

module.exports.validarChat = msg => {
  if(msg.chat.id == process.env.ID_GROUP_TELEGRAM) return true;
  if(msg.chat.type != 'private') bot.leaveChat(msg.chat.id)
    .then(() => console.log('Bot saiu do grupo.'))
    .catch((err) => console.error('Erro ao sair do grupo:', err));
}

module.exports.seTopico = (msg, idTopico, func) => {
  const lista = Array.isArray(idTopico) ? idTopico : [idTopico];
  lista.forEach(id => {
    if(msg.message_thread_id == id) func(bot, msg);
  });
}

module.exports.seTexto = (msg, texto, func) => {
  if(msg.text == texto) func(bot, msg);
}

module.exports.seTopicoETexto = (msg, idTopico, texto, func) => {
  module.exports.seTopico(msg, idTopico, (bot, msg) => module.exports.seTexto(msg, texto, (bot, msg) => func(bot, msg)));
}