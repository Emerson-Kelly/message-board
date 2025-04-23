#!/usr/bin/env node

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
    connectionString: 'postgresql://emersonkelly:%40Elrkelrk4945@localhost:5432/message_board_users',
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();

