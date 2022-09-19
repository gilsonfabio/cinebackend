const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const enquetes = await connection('enqMovies').select('*');
    
        return response.json(enquetes);
    },    

    async createEnq(request, response) {
        const { enqDescricao, enqIniVotacao, enqFimVotacao, enqCategoria } = request.body;
    
        const [enqId] = await connection('enqMovies').insert({
            enqDescricao,
            enqIniVotacao, 
            enqFimVotacao, 
            enqCategoria        
        });
           
        return response.json({enqId});
    },

    async enquetesMov (request, response) {
        let id = request.params.IdMovie;

        console.log('Enquete:',id);

        const movEnq = await connection('movEnquetes')
        .where('movEnqMovie', id)
        .join('enqMovies', 'enqId', 'movEnquetes.movEnqEnquete')
        .orderBy('movEnqId')
        .select(['movEnquetes.*', 'enqMovies.enqDescricao', 'enqMovies.enqId']);
        
        return response.json(movEnq);
    },

    async insertEnq(request, response) {
        const { movEnqMovie, movEnqEnquete} = request.body;
    
        console.log(movEnqMovie);
        console.log(movEnqEnquete);

        const [movEnqId] = await connection('movEnquetes').insert({
            movEnqMovie, 
            movEnqEnquete      
        });
           
        return response.json({movEnqId});
    },

    async searchEnq (request, response) {
        let id = request.params.idEnq;

        const enquete = await connection('enqMovies')
        .where('enqId', id)
        .orderBy('enqDescricao')
        .select('*');

        return response.json(enquete);
    },
    
    async updEnquete(request, response) {
        const idEnquete  = request.params.idEnq;        
        const { enqDescricao, enqIniVotacao, enqFimVotacao, enqCategoria } = request.body;
        const enquete = await connection('enqMovies')
        .where('enqId', idEnquete)        
        .update({
            'enqDescricao': enqDescricao,
            'enqIniVotacao': enqIniVotacao,
            'enqFimVotacao': enqFimVotacao,
            'enqCategoria': enqCategoria
        });
 
        return response.status(204).send();
    },
};