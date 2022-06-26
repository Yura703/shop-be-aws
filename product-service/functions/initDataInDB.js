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

export const handler = async event => {
  const client = new Client(dbOptions);
  await client.connect();

  try {
    const createResult = await client.query(
      `create table if not exist products (
        id ,
        title text, 
        description, 
        price, 
        imageid, 
        count 
      )`
    );

    const insertResult = await client.query(
      `insert into products (count, description, price, title, imageId) values
      (5, "The Beatles - Let It Be [LP] 2020", 10, "Vinyl Records - The Beatles 1970", "000000001"),
      (1, "Jimi Hendrix - Both Sides Of The Sky [2LP] 1970", 150, "Vinyl Records - Jimi Hendrix 1970", "000000002"),
      (10, "The Beatles - Abbey Road [LP] 2019", 23, "Vinyl Records - The Beatles 1969", "000000003"), 
      (1, "Short Product Description7", 15, "Vinyl Records - The Beatles","000000004"),
      (1, "Queen - Greatest Hits [2LP] 2016", 23, "Vinyl Records - Queen 1981", "000000005"),
      (1, "Nirvana - Nevermind [LP] 2015", 15, "Vinyl Records - Nirvana 1991", "000000006"),
      (1, "Joe Cocker - The Life Of A Man. The Ultimate Hits 1968 - 2013 [2LP] 2016", 23,"Vinyl Records - Joe Cocker", "000000007"),
      (1, "Andrea Bocelli - Andrea [2LP] 2015", 15, "Vinyl Records - Andrea Bocelli", "000000008");
    `);
  } catch (error) {
    console.error('Error: ' + error);
  } finally {
    client.end();
  }
}