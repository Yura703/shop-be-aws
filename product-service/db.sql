--create database my_shop;
--
--create table products(
--id uuid primary key default uuid_generate_v4(),
--title varchar(100) NOT NULL,
--description varchar(100) NOT NULL,
--price integer NOT NULL,
--imageId integer NOT NULL
--)

--create extension if not exists "uuid-ossp";

--create table stocks(
--product_id uuid,
--count integer NOT NULL,
--foreign key ("product_id") references "products" ("id")
--)

--insert into products (description, price, title, imageId) values
--      ('The Beatles - Let It Be [LP] 2020', 10, 'Vinyl Records - The Beatles 1970', 1)
--      ('Jimi Hendrix - Both Sides Of The Sky [2LP] 1970', 150, 'Vinyl Records - Jimi Hendrix 1970', 2),
--      ('The Beatles - Abbey Road [LP] 2019', 23, 'Vinyl Records - The Beatles 1969', 3), 
--      ('Short Product Description7', 15, 'Vinyl Records - The Beatles', 4),
--      ('Queen - Greatest Hits [2LP] 2016', 23, 'Vinyl Records - Queen 1981', 5),
--      ('Nirvana - Nevermind [LP] 2015', 15, 'Vinyl Records - Nirvana 1991', 6),
--      ('Joe Cocker - The Life Of A Man. The Ultimate Hits 1968 - 2013 [2LP] 2016', 23,'Vinyl Records - Joe Cocker', 7),
--      ('Andrea Bocelli - Andrea [2LP] 2015', 15, 'Vinyl Records - Andrea Bocelli', 8)

-- insert into stocks (product_id, count) values
-- ( '297f6b26-768c-45c7-bce5-58ae7cade8f3', 5 ),
-- ( '59a8c87c-a0ae-4ea3-bc47-92fa964dd04b', 2 ),
-- ( '5590de49-5319-481d-8ed7-eb56fbb97d62', 4 ),
-- ( '5e0ebff5-dd3d-4eb7-a7a3-5ff31853c5cc', 3 ),
-- ( '58dc53a5-5f59-4cd0-a8a4-ef7f682602ea', 8 ),
-- ( 'b9f10ce3-2048-4796-b6dd-6c41c2555c2b', 2 ),
-- ( '1eb5383d-0185-413f-afa5-158e9114edd3', 3 ),
-- ( '40feabf5-f8ee-4630-ab8e-9c2f2b69f82c', 7 )