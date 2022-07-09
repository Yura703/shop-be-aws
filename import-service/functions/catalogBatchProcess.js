import AWS from "aws-sdk";
import { Client } from "pg";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

export const catalogBatchProcess = async (event) => {
  const client = new Client(dbOptions);
  const sns = new AWS.SNS({ region: "eu-west-1" });
  const bodyEvent = await event.Records.map(({ body }) => body);

  await client.connect();

  for (let data of bodyEvent) {
    const { price, title, description, count } = JSON.parse(data);
    
    await client.query("BEGIN");

    const queryResult = await client.query(`insert into products ( title, description, price) values ('${title}', '${description}', '${price}') returning id`);
    const productId = queryResult.rows[0].id;      

    await client.query(`insert into stocks (product_id, count) values ('${productId}', '${count}')`);

    await client.query("COMMIT");

    sns.publish({
        Subject: "You are invited processed",
        Message: JSON.stringify(bodyEvent),
        TopicArn: process.env.SNS_ARN,
      },
      () => {
        console.log("Send email for:" + JSON.stringify(bodyEvent));
      }
    );

    return {
      statusCode: 201,
      headers: {
        "Content-Type": "application/JSON",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,          
      },
      body: JSON.stringify(bodyEvent),

      isBase64Encoded: false,
    };
  }
  
  client.end();  
};