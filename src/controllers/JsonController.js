const connection = require('../database/connection');
var moment = require('moment');

const fs = require('fs');

module.exports = {   
    async index (request, response) {
        const votos = await connection('votMovies').select('*');
    
        return response.json(votos);
    },    
};
