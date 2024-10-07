const db = require('../config/db');

module.exports.novo =  (bot, msg) => {
  const criando = bot.criandos[msg.from.id];
  console.log(criando);
  if(criando)
    bot.sendMessage(msg.chat.id,
      `Você precisa terminar de criar o(a) ${criando.tipo}`,
      {message_thread_id: msg.message_thread_id});
  
  else {
    bot.criandos[msg.from.id] = {
      tipo: 'personagem',
      acao: 'novo',
      dados: {
        dono: msg.from.id,
        nome: null,
        descricao: null,
        atributos: {
          forca: null,
          resistencia: null,
          agilidade: null,
          mana: null,
          vida: null
        }
      }
    }
    
    bot.sendMessage(msg.chat.id, 'Digite o nome de seu personagem:', {message_thread_id: msg.message_thread_id});
  }
}

// Nome
// Descrição
// Atributos
// - Força
// - Resistencia
// - Agilidade
// - Mana
// - Vida