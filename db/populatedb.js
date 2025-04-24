#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config();

import clientPkg from 'pg';
const { Client } = clientPkg;

const SQL = `
  DROP TABLE IF EXISTS messages;
  DROP TABLE IF EXISTS usernames;

  CREATE TABLE IF NOT EXISTS usernames (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INTEGER REFERENCES usernames(id)
  );
`;

async function main() {
  console.log("Seeding database...");

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

