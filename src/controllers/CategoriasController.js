const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const categorias = await connection('catMovies').select('*');
    
        return response.json(categorias);
    },    

    async create(request, response) {
        const { catDescricao } = request.body;
    
        const [catId] = await connection('catMovies').insert({
            catDescricao        
        });
           
        return response.json({catId});
    },

    async searchCat (request, response) {
        let id = request.params.idCat;

        const categoria = await connection('catMovies')
        .where('catId', id)
        .orderBy('catDescricao')
        .select('*');

        return response.json(categoria);
    },
    
    async updCategoria(request, response) {
        const idCategoria  = request.params.idCat;        
        const { catDescricao } = request.body;
        console.log(catDescricao);         
        const categoria =  await connection('catMovies')
        .where('catId', idCategoria)        
        .update('catDescricao', catDescricao);
 
        return response.status(204).send();
    },

    async delCategoria(request, response) {
        let id = request.params.idCat;   
        //let datDelete = new Date();
        let status = 'E';
        await connection('catMovies').where('catId', id)   
        .update({            
            catStatus: status 
        });
           
        return response.status(204).send();
    },
};