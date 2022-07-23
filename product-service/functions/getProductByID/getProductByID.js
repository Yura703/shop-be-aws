import { Client } from 'pg';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 5000
};

const handlerGetByID = (products = {}, status = 200) => ( 
  {
    headers: {
      'Content-Type': 'application/json',      
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
    },
    statusCode: status,
    body: JSON.stringify(products),
  }
);

export const handler = async event => {
  const { productId } = event.pathParameters || null;
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const { rows: product } = await client.query(`select * from products where id='${productId}'`);
    return await handlerGetByID(product, 200);

  } catch (error) {
    console.error('Error: ' + error);
  } finally {
    client.end();
  }
}
