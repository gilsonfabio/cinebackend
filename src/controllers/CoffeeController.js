const connection = require('../database/connection');

module.exports = {   
    async index (request, response) {
        const pedidos = await connection('pedidos')        
        .select('*');
         
        return response.json(pedidos);
    },    
        
    async searchPedido (request, response) {
        let pedidoId = request.params.idPed;
        const pedido = await connection('pedidos')
        .where('idPedido', pedidoId)
        .select('*');
          
        return response.json(pedido);
    },
       
    async searchItens (request, response) {
        let pedidoId = request.params.idPed;
        const itens = await connection('itepedidos')
        .where('idPedido', pedidoId)
        .join('produtos', 'idProd', 'itepedidos.iteProduto')
        .select(['itepedidos.*', 'produtos.proDescricao', 'produtos.proReferencia', 'produtos.proCodBarra', 'produtos.proPreVenda']);
           
        return response.json(itens);

    },       
};
