module.exports.apagarUltimaMensagem =  (bot, msg) => {
  bot.deleteMessage(msg.chat.id, msg.message_id);
}