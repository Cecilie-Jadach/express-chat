import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getMessages() {
  const [rows] = await pool.query("SELECT * FROM messages");
  return rows;
}

export async function getMessageById(id) {
  const [rows] = await pool.query(`SELECT * FROM messages WHERE id = ?`, [id]);
  return rows[0];
}

export async function createMessage(user, content) {
  const [result] = await pool.query(
    `INSERT INTO messages (user, content) VALUES (?, ?)`,
    [user, content],
  );

  const id = result.insertId;
  return getMessageById(id);
}

export async function updateMessageById(id, user, content) {
  await pool.query(`UPDATE messages SET user = ?, content = ? WHERE id = ?`, [
    user,
    content,
    id,
  ]);
  return getMessageById(id);
}

export async function updateMessageByIdPatch(id, user, content) {
  await pool.query(
    `UPDATE messages
     SET user = COALESCE(?, user), content = COALESCE(?, content)
     WHERE id = ?`,
    [user ?? null, content ?? null, id],
  );
  return getMessageById(id);
}

export async function deleteMessageById(id) {
  const [result] = await pool.query(`DELETE FROM messages WHERE id = ?`, [id]);
  return result.affectedRows > 0;
}
