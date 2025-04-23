import pool from "./pool.js";

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
  


