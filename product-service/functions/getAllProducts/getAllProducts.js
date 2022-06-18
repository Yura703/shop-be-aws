import products from '../productList.json';

const handlerAllProducts = (products = {}, status = 200) => 
  ({
    headers: {
      'Content-Type': 'application/json',      
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: status,
    body: JSON.stringify(products),  
  });

export const handler = async (_event) => await handlerAllProducts(products);