const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN_API_TELEGRAM;
const bot = new TelegramBot(token, { polling: true });

module.exports = bot;

module.exports.validarChat = msg => {
  if(msg.chat.id == process.env.ID_GROUP_TELEGRAM) return true;
  if(msg.chat.type != 'private') bot.leaveChat(msg.chat.id)
    .then(() => console.log('Bot saiu do grupo.'))
    .catch((err) => console.error('Erro ao sair do grupo:', err));
}

module.exports.seTopico = (msg, idTopico, func) => {
  if(msg.message_thread_id == idTopico) func(msg);
}

module.exports.seTexto = (msg, texto, func) => {
  if(msg.text == texto) func(msg);
}

module.exports.seTopicoETexto = (msg, idTopico, texto, func) => {
  module.exports.seTopico(msg, idTopico, module.exports.seTexto(msg, texto, msg => func(msg)));
}