const mailer = require("nodemailer");
const connection = require('../database/connection');

module.exports = { 
    async searchUser(request, response) {
        const emailUsuario = request.params.email;
        const user = await connection('usrMovies')
            .where('usrEmail', emailUsuario)
            .select('usrNome')
            .first();
          
        if (!user) {
            return response.status(400).json({ error: 'Não encontrou usuario com este ID'});
        } 

        //const nomeUsuario = user.usrNome;
        const nomeUsuario = 'no-reply@aparecida.go.gov.br';

        const smtpTransport = mailer.createTransport({
            host: 'smtp.mailtrap.io',
            port: 2525,
            secure: false, //SSL/TLS
            auth: {
                user: '',
                pass: ''
            },
        })

        //let smtpTransport = mailer.createTransport({
        //    sendmail: true,
        //    newline: 'windows',
        //    path: '/usr/sbin/sendmail'
        //});
    
        const mail = {
            from: `${nomeUsuario}`,
            to: emailUsuario,
            subject: `Envio de mensagem`,
            text: 'mensagem para envio no email ',
            html: "<b>Opcionalmente, pode enviar como HTML</b>"
        }

        console.log(mail);
    
        return new Promise((resolve, reject) => {
            smtpTransport.sendMail(mail)
                .then(response => {
                    smtpTransport.close();
                    return resolve(response);
                })
                .catch(error => {
                    smtpTransport.close();
                    return reject(error);
                });
        })

        //console.log(nomeUsuario);
        //console.log(emailUsuario);
        //console.log(smtpTransport);
        //console.log(mail);
    }
}