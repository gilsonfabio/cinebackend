const connection = require('../database/connection');

module.exports = {   
    async upload (request, response) {        

        if(request.file){
            return response.json({
                erro: false,
                mensagem: "Upload realizado com sucesso!"
            });
        }
    
        return response.status(400).json({
            erro: true,
            mensagem: "Erro: Upload não realizado!"
        });        
    },    
};
