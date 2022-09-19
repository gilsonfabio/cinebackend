const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const users = await connection('usrMovies').select('*');
    
        return response.json(users);
    },    

    async signIn(request, response) {
        let email = request.params.email;
        let senha = request.params.password;

        //console.log(email)
        //console.log(senha)
        var encodedVal = crypto.createHash('md5').update(senha).digest('hex');
        const user = await connection('usrMovies')
            .where('usrEmail', email)
            .where('usrSenha', encodedVal)
            .select('usrId', 'usrNome', 'usrNivAcesso')
            .first();
          
        if (!user) {
            return response.status(400).json({ error: 'Não encontrou usuario com este ID'});
        } 

        //console.log(user);

        return response.json(user);
    },

    async login(request, response) {
        const { email, password } = request.body;
    
        //console.log(email);
        //console.log(password);

        var senha = crypto.createHash('md5').update(password).digest('hex');
        const user = await connection('usrMovies')
            .where('usrEmail', email)
            .where('usrSenha', senha)
            .select('usrId', 'usrNome', 'usrNivAcesso')
            .first();
          
        if (!user) {
            return response.status(400).json({ error: 'Não encontrou usuario com este ID'});
        } 

        return response.json(user);
    },

    async create(request, response) {
        const { usrNome, usrSenha, usrEmail, usrNivAcesso } = request.body;
        var status = 'A'; 
        var senha = crypto.createHash('md5').update(usrSenha).digest('hex');
        const [usrId] = await connection('usrMovies').insert({
            usrNome, 
            usrSenha: senha, 
            usrEmail,
            usrNivAcesso,
            usrStatus: status
        });
           
        return response.json({usrId});
    },
     
    async searchUser (request, response) {
        let id = request.params.idUsr;
        const user = await connection('usrMovies')
        .where('usrId', id)        
        .select(['*']);
        
        return response.json(user);
    },

    async searchEmail (request, response) {
        let emailUsuario = request.params.email;
        const user = await connection('usrMovies')
            .where('usrEmail', emailUsuario)
            .select('usrNome')
            .first();

        if (!user) {
            return response.status(400).json({ error: 'Não encontrou usuario com este email'});
        } 
        return response.json(user);
    },    

    async updPassword(request, response) {
        let email = request.params.emailUsuario;         
        const { password } = request.body;
        
        let datUpdate = new Date();

        var senha = crypto.createHash('md5').update(password).digest('hex');

        await connection('usrMovies').where('usrEmail', email)   
        .update({
            usrSenha: senha,           
        });
           
        return response.status(204).send();
    },
};
