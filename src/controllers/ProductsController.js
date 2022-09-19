const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const produtos = await connection('produtos').select('*');
    
        return response.json(produtos);
    },
    
    async readLinhas (request, response) {
        const linhas = await connection('linhas').select('*');
    
        return response.json(linhas);
    },

    async detProduct(request, response) {
        let id = request.params.proId;
        const product = await connection('produtos')
            .where('idProd', id)
            .select('*')
            .first();
          
        if (!product) {
            return response.status(400).json({ error: 'Produto nao encontrado'});
        } 

        //console.log(product);

        return response.json(product);
    },
     
     
     
     
      
};