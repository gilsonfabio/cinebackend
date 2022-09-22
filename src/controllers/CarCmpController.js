const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const compras = await connection('compras').select('*');
         
        return response.json(compras);
    },
    
    async carcompras(request, response) {
        
        console.log(request.body);
        const { carData, carHora, carUser, carQtdTotal, carVlrTotal, carDesTotal, carCodCupom, carVlrPagar,
             iteCarProId, iteCarProQtde, iteCarProVlrUnit} = request.body;
        let id = request.body.carUser;
        let status = 'A';
        let iteVlrTotal = iteCarProQtde * iteCarProVlrUnit;
        let iteNro = 1;
        const car = await connection('carcompras')
            .where('carUser', id)
            .where('carStatus', status)
            .select('*')
            .first();
        
        let nroCar = car.carId;
        let ultIte = car.carQtdTotal;

        if (!car) {
            const [carId] = await connection('carcompras').insert({
                carData, 
                carHora, 
                carUser,
                carQtdTotal: iteNro,
                carVlrTotal,
                carDesTotal,
                carCodCupom,
                carVlrPagar,
                carStatus:status
            });

            //console.log('criado o carrinho n.: ', carId )

            const [item] = await connection('carItems').insert({
                iteCarId: carId, 
                iteCarIte: iteNro, 
                iteCarProId,
                iteCarProQtde,
                iteCarProVlrUnit,
                iteCarProVlrtotal: iteVlrTotal,
            });
        }else {
            //console.log('Foi encontrado carrinho em aberto!')
            const item = await connection('carItems')
                .where('iteCarId', nroCar)
                .where('iteCarProId', iteCarProId)
                .increment('iteCarProQtde')
                .increment({iteCarProVlrtotal: iteCarProVlrUnit} );

            if (!item) {
                ultIte += 1 ;
                const [item] = await connection('carItems').insert({
                    iteCarId: nroCar, 
                    iteCarIte: ultIte, 
                    iteCarProId,
                    iteCarProQtde,
                    iteCarProVlrUnit,
                    iteCarProVlrtotal: iteVlrTotal,
                });
            }
            const cmp = await connection('carcompras')
                .where('carId', nroCar)
                .increment('carQtdTotal')
                .increment({carVlrTotal: iteCarProVlrUnit} )
                .increment({carVlrPagar: iteCarProVlrUnit} );
        } 

        return response.json(car);
    },
       
    async searchCar(request, response) {
        let id = request.params.idUsrCar;
        let status = 'A';

        const car = await connection('carcompras')
            .where('carUser', id)
            .where('carStatus', status)
            .select('carId', 'carQtdtotal')
            .first();
          
        if (!car) {
            return response.status(400).json({ error: 'Não encontrou car. compras p/ este ID'});
        } 

        console.log(car);
        
        return response.json(car);
    },    

    async headerCar(request, response) {
        let id = request.params.carId;
        let status = 'A';

        const car = await connection('carcompras')
            .where('carId', id)
            .where('carStatus', status)
            .join('usrMovies', 'usrId', 'carcompras.carUser')
            .select(['carcompras.*', 'usrMovies.usrNome'])
            .first();
          
        if (!car) {
            return response.status(400).json({ error: 'Não encontrou car. compras p/ este ID'});
        } 

        console.log(car);
        
        return response.json(car);
    },

    async itemsCar(request, response) {
        let id = request.params.carId;
        let status = 'A';

        const item = await connection('carItems')
            .where('iteCarId', id) 
            .join('produtos', 'idProd', 'carItems.iteCarProId')
            .select(['carItems.*', 'produtos.proDescricao', 'produtos.proReferencia', 'produtos.proAvatar'])
          
        if (!item) {
            return response.status(400).json({ error: 'Não encontrou itens compras p/ este ID'});
        } 

        console.log(item);
        
        return response.json(item);
    },
};