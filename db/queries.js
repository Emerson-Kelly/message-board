import pool from "./pool.js";

// CREATE POOL QUERIES FOR THE ROUTES (SINCE CONTROLLERS AREN'T BEING USED IN THIS PROJECT)
//KEEP THE MESSAGES ARRAY FOR NOW

/*
List of relations
Schema |       Name       |   Type   |    Owner     
--------+------------------+----------+--------------
public | messages         | table    | emersonkelly
public | messages_id_seq  | sequence | emersonkelly
public | usernames        | table    | emersonkelly
public | usernames_id_seq | sequence | emersonkelly
*/

export async function getAllUsers() {
    const { rows } = await pool.query(`
    SELECT
      usernames.id AS user_id,
      usernames.username,
      messages.id AS message_id,
      messages.message,
      messages.created_at
    FROM usernames
    INNER JOIN messages ON usernames.id = messages.user_id;
  `);

    console.log(rows);
    return rows;
  }

  export async function getUserDetails(userId) {
    const { rows } = await pool.query(`
      SELECT
        usernames.id AS user_id,
        usernames.username,
        messages.id AS message_id,
        messages.message,
        messages.created_at
      FROM usernames
      INNER JOIN messages ON usernames.id = messages.user_id
      WHERE usernames.id = $1;
    `, [userId]);
  
    console.log(rows);
    return rows;
  }
  


