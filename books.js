// Import the 'pool' object so our helper functions can interact with the PostgreSQL database
import { pool } from "./db/index.js";

export async function getBooks() {
  // Query the database and return all books

  // Define the SQL query to fetch all books from the 'books' table
  const queryText = "SELECT * FROM books";

  // Use the pool object to send the query to the database
  const result = await pool.query(queryText);

  // The rows property of the result object contains the retrieved records
  return result.rows;
}

export async function getBookById(id) {
  // Query the database and return the book with a matching id or null

  // Define the SQL query to fetch the book with the specified id from the 'books' table
  const queryText = "SELECT * FROM books WHERE id = $1";

  // Use the pool object to send the query to the database
  // passing the id as a parameter to prevent SQL injection
  const result = await pool.query(queryText, [id]);

  // The rows property of the result object contains the retrieved records
  // If a book with the specified id exists, it will be the first element in the rows array
  // If no book exists with the specified id, the rows array will be empty
  return result.rows[0] || null;
  await pool.end();
}

export async function createBook(book) {
  // Query the database to create a book and return the newly created book
const queryText = "INSERT INTO books (title, published_date, author_id) VALUES ($1, $2, $3) RETURNING * ";
const result = await pool.query(queryText, [book.title, book.published_date, book.author_id]);
return result.rows[0] || null;
await pool.end();
}




export async function updateBookById(id, updates) {
  // Query the database to update a book and return the newly updated book or null
  const {title, published_date,author_id} = updates;
  const queryText =  "UPDATE books SET title = $1, published_date = $2,  author_id = $3 WHERE id = $4 RETURNING *"
  const result = await pool.query(queryText, [title, published_date, author_id, id]);
  return result.rows[0] || null;
  
  await pool.end();
}

// UPDATE books SET title = 'count', published_date = '1994-04-04', author_id = 4 WHERE id = 12 RETURNING *;

export async function deleteBookById(id) {
  // Query the database to delete a book and return the deleted book or null
  const queryText = "DELETE FROM books WHERE id = $1 RETURNING *";
  const result = await pool.query(queryText, [id]);
  return result.rows[0] || null;
  await pool.end();
}



