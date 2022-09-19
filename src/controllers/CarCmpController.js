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
       
};