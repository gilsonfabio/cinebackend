const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const contatos = await connection('contatos')
        .orderBy('conNome')
        .select('*');
    
        return response.json(contatos);
    }, 
    
    async searchContatos (request, response) {
        let usuario = request.params.idUsr;
        const contatos = await connection('contatos')
        .where('conUsuario', usuario)
        .select('*');
          
        return response.json(contatos);
    },

    async escolha (request, response) {
        let usuario = request.params.cntEscolhido;
        const contatos = await connection('contatos')
        .where('idContato', usuario)
        .select('*');
          
        return response.json(contatos);
    },

};
