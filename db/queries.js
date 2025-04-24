import pool from "./pool.js";

export async function addMessage({ name, message }) {
    const client = await pool.connect();
  
    try {
      // Insert username if it doesn't exist
      let result = await client.query(
        `INSERT INTO usernames (username) VALUES ($1)
         ON CONFLICT (username) DO NOTHING
         RETURNING id`,
        [name]
      );
  
      let userId;
      if (result.rows.length > 0) {
        userId = result.rows[0].id;
      } else {
        const existing = await client.query(
          'SELECT id FROM usernames WHERE username = $1',
          [name]
        );
        userId = existing.rows[0].id;
      }
  
      await client.query(
        'INSERT INTO messages (message, user_id) VALUES ($1, $2)',
        [message, userId]
      );
    } finally {
      client.release();
    }
  }  

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
  


