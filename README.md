# Connecting Our Library to a Database

## Create a Postgres database with ElephantSQL

Navigate to the [ElephantSQL website](https://www.elephantsql.com/) and create a new Postgres database.

The requirements have changed since yesterday. Now a single book can only have one author. The Entity Relationship Diagram below shows the new relationship between tables. You can find out more about ERDs [here](https://www.youtube.com/watch?v=QpdhBUYk7Kk) - you don't have to create one now!

![Entity Relationship Diagram](/readme-assets/erd.png "Entity Relationship Diagram")

<br>

## Create Environment variables

Create a `.env` file at the root of your project. It should contain the following name/value pairs: (Be sure to insert your actual values in this file!)

```
PORT=
DB_CONNECTION_STRING=
```

Your `DB_CONNECTION_STRING` will be provided by ElephantSQL.

The API won't have a hardcoded PORT like you've done before in previous weeks.

<br>

## Using dot env

You can load environment variables using the [dotenv](https://www.npmjs.com/package/dotenv) package. It's already been installed for you and should appear in your `package.json` file as a dev dependency.

The following scripts have been added to your `package.json` file: (Notice the `start` script does not use dotenv, so your environment variables will not be loaded - unlike the `dev` script.)

```json
"start": "node app.js",
"dev": "nodemon -r dotenv/config app.js",
"reset-database": "node -r dotenv/config db/scripts/reset-database.js"
```

Now, whenever you enter `npm run dev` the `dotenv` package will load your environment variables during runtime, and you'll be able to access them via `process.env`.

When you enter `npm run reset-database` the script should reset your database, inspect the code in `db/scripts/reset-database.js` for more details.

<br>

## The .env file and .gitignore

`.env` has been added to your `.gitignore` file. You don't want those sensitive database credentials being pushed up to GitHub!

```
node_modules
.env
```

<br>

### Using the `pg` package:

You can connect to the PostgreSQL database using the [`pg`](<(https://node-postgres.com/).>) package. It's already been added to your `package.json` file as a dependency.

The job of the `db/index.js` file is to export a `Pool` from the `pg` package enabling you to use the `pool.query()` method so you to execute SQL queries in other files.

Always use [parameterized queries](https://node-postgres.com/features/queries) with the `pool.query()` method to help protect against SQL injection attacks - this is important!

<br>

## Existing Routes

The route handlers are already set up and functioning. Take a look inside `app.js`.

| Method | Path       | Request Body          | Result            | Status code |
| ------ | ---------- | --------------------- | ----------------- | ----------- |
| GET    | /books     |                       | get all books     | 200         |
| GET    | /books/:id |                       | get a book by id  | 200         |
| POST   | /books     | A book object         | create a new book | 201         |
| PATCH  | /books/:id | A partial book object | update a book     | 200         |
| DELETE | /books/:id |                       | delete a book     | 200         |

| Method | Path         | Request Body            | Result              | Status code |
| ------ | ------------ | ----------------------- | ------------------- | ----------- |
| GET    | /authors     |                         | get all authors     | 200         |
| GET    | /authors/:id |                         | get an author by id | 200         |
| POST   | /authors     | An author object        | create a new author | 201         |
| PATCH  | /authors/:id | A partial author object | update an author    | 200         |
| DELETE | /authors/:id |                         | delete an author    | 200         |

<br>

## Code the helper functions

Previously you've been using the filesystem to read and write data to JSON files.

Now you're going to use an SQL database, so there's no need to use the `fs` module anymore.

Complete the code for each function inside `books.js` and `authors.js`.

Write your queries using the `pool.query()` method using the `pool` imported at the top of each file.

The route handlers are already setup, so once you think you've completed each helper function, test the API with Thunder Client.

Remember, go step by step, make a plan and break each problem down!
