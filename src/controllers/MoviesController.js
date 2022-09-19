const connection = require('../database/connection');

//.......movStatus = 'A' => Filmes ativos / 'E' => Filmes Excluidos 

module.exports = {   
    async index (request, response) {
        let status = 'A';
        const movies = await connection('movCine')
        .where('movStatus', status)
        .join('catMovies', 'catId', 'movCine.movCategoria')
        .orderBy('movTitulo')
        .select(['movCine.*', 'catMovies.catDescricao', 'catMovies.catId']);
    
        return response.json(movies);
    },  
       
    async tableMovies (request, response) {
        let status = 'A';
        const movies = await connection('movCine')
        .where('movStatus', status)
        .join('catMovies', 'catId', 'movCine.movCategoria')
        .orderBy('movTitulo')
        .select(['movCine.movId', 'movCine.movTitulo', 'movCine.movDiretor', 'movCine.movAnoCriacao']);
    
        return response.json(movies);
    },  
      
    async searchYear (request, response) {
        let movieYear = request.params.anoMovies;
        let status = 'A';
        const movies = await connection('movCine')
        .where('movAnoPart', movieYear)
        .where('movStatus', status)
        .join('catMovies', 'catId', 'movCine.movCategoria')
        .orderBy('movTitulo')
        .select(['movCine.*', 'catMovies.catDescricao', 'catMovies.catId']);
        return response.json(movies);
    },   

    async searchCat (request, response) {
        let catMovie = request.params.idCat;
        let movieYear = request.params.anoMovies;
        let status = 'A';
        const movies = await connection('movCine')
        .where('movAnoPart', movieYear)
        .where('movCategoria', catMovie)
        .where('movStatus', status)
        .join('catMovies', 'catId', 'movCine.movCategoria')
        .orderBy('movTitulo')
        .select(['movCine.*', 'catMovies.catDescricao', 'catMovies.catId']);
        return response.json(movies);
    },
    
    async searchMovie (request, response) {
        let id = request.params.idMov;
        let status = 'A';
        const movies = await connection('movCine')
        .where('movId', id)
        .where('movStatus', status)
        .join('catMovies', 'catId', 'movCine.movCategoria')
        .orderBy('movTitulo')
        .select(['movCine.*', 'catMovies.catDescricao', 'catMovies.catId']);
        
        return response.json(movies);
    },

    async create(request, response) {
        const { movTitulo, movSinopse, movDiretor, movAnoCriacao, movAnoPart, movUrlPoster, movCategoria} = request.body;
        
        let datCriacao = new Date();
        let status = 'A';
         
        const [movId] = await connection('movCine').insert({
            movTitulo, 
            movSinopse, 
            movDiretor, 
            movAnoCriacao, 
            movAnoPart, 
            movUrlPoster, 
            movCategoria,
            movDatProCriacao: datCriacao, 
            movDatProUpdate, 
            movDatProDelete, 
            movStatus: status  
        });
           
        return response.json({idMovie});
    },

    async updMovie(request, response) {
        let id = request.params.idMov;   
        const { movTitulo, movSinopse, movDiretor, movAnoCriacao, movAnoPart, movUrlPoster, movCategoria } = request.body;
        
        let datUpdate = new Date();

        await connection('movCine').where('movId', id)   
        .update({
            movTitulo: movTitulo, 
            movSinopse: movSinopse, 
            movDiretor: movDiretor, 
            movAnoCriacao: movAnoCriacao, 
            movAnoPart: movAnoPart, 
            movUrlPoster: movUrlPoster, 
            movCategoria: movCategoria,
            movDatProUpdate: datUpdate 
        });
           
        return response.status(204).send();
    },
      
    async delMovie(request, response) {
        let id = request.params.idMov;   
        let datDelete = new Date();
        let status = 'E';
        await connection('movCine').where('movId', id)   
        .update({            
            movDatProDelete: datDelete,
            movStatus: status 
        });
           
        return response.status(204).send();
    },
};
