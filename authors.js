// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getAuthors() {
  // Define the SQL query to fetch all books from the 'books' table
  const queryText = "SELECT * FROM authors";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getAuthorById(id) {
  // Query the database and return the author with a matching id or null
  const queryText = "SELECT * FROM authors WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
}

export async function createAuthor(author) {
  // Query the database to create an author and return the newly created author
  const queryText =
    "INSERT INTO authors (first_name, last_name) VALUES ($1, $2) RETURNING *";

  const result = await pool.query(queryText, [
    author.first_name,
    author.last_name,
  ]);
  return result.rows[0] || null;
}

export async function updateAuthorById(id, updates) {
  // Query the database to update an author and return the newly updated author or null
}

export async function deleteAuthorById(id) {
  // Query the database to delete an author and return the deleted author or null
}
