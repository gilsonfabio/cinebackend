const connection = require('../database/connection');
var moment = require('moment');

module.exports = {   
    async index (request, response) {
        const votos = await connection('votMovies').select('*');
    
        return response.json(votos);
    },    

    async create(request, response) {
        const { votUser, votEnq, votAno, votMovie} = request.body;    
          
        const votData = moment().format('YYYY-MM-DD');
        const votHora = moment().format('hh:mm:ss');
        
        try {
            const voto = await connection('votMovies').insert({
                votUser,
                votEnq,
                votAno,
                votMovie,
                votData,
                votHora        
            })
            let qtdVoto = 1;
            const vtt = await connection('votEnquetes').insert({
                vttEnq: votEnq,
                vttAno: votAno,
                vttMovie: votMovie,
                vttQuant: qtdVoto,
            });
            if (!vtt) {                
                const vtt = await connection('votEnquetes')
                    .where('vttEnq','=',votEnq)
                    .where('vttAno', '=',votAno)
                    .where('vttMovie','=',votMovie)
                    .increment({vttQuant: 1})      
            }
                   
            return response.status(201).send();

        } catch (err) {
            return response.status(400).json({
                error: 'Erro voto!'
            })
        }
    },

    async vinenquete(request, response) {
        const { votEnq, votAno, votMovie} = request.body;    

        console.log(votEnq);
        console.log(votAno);
        console.log(votMovie);

        try {            
            let qtdVoto = 0;
            const vtt = await connection('votEnquetes').insert({
                vttEnq: votEnq,
                vttAno: votAno,
                vttMovie: votMovie,
                vttQuant: qtdVoto,
            });
                               
            return response.status(201).send();

        } catch (err) {
            return response.status(400).json({
                error: 'Erro na vinculação da enquete!'
            })
        }
    },

    async searchEnq (request, response) {
        let votAno = request.params.anoEnq;
        let votEnq = request.params.idEnq;
        const enquetes = await connection('votEnquetes')
        .where('vttAno', votAno)
        .where('vttEnq', votEnq)
        .join('enqMovies', 'enqId', 'votEnquetes.vttEnq')
        .join('movCine', 'movId', 'votEnquetes.vttMovie')
        .orderBy('vttQuant', 'desc')
        .select(['votEnquetes.*', 'enqMovies.enqDescricao', 'movCine.movTitulo']);

        return response.json(enquetes);
    }, 

    async searchEnqMovie (request, response) {
        let votMovie = request.params.idMov;
        let votAno = request.params.anoEnq;
        const enqmovie = await connection('votEnquetes')
        .where('vttAno', votAno)
        .where('vttMovie', votMovie)
        .join('enqMovies', 'enqId', 'votEnquetes.vttEnq')
        .join('movCine', 'movId', 'votEnquetes.vttMovie')
        .select(['votEnquetes.*', 'enqMovies.*', 'movCine.movTitulo']);

        return response.json(enqmovie);
    }, 
};
