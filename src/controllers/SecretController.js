const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const secretarias = await connection('secretarias').select('*');
    
        return response.json(secretarias);
    },    

    async create(request, response) {
        const { secCodigo, secDescricao } = request.body;
 
        const [secId] = await connection('secretarias').insert({
            secCodigo,
            secDescricao        
        });
           
        return response.json({secId});
    },

    async searchSecret (request, response) {
        let id = request.params.idSec;

        const secretaria = await connection('secretarias')
        .where('secId', id)
        .orderBy('secDescricao')
        .select('*');

        return response.json(categoria);
    },    
};