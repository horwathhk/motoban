const connectionString =
  "postgres://aaron:kembo123!@localhost:5432/motobayMainDB";
const pgp = require("pg-promise")();

const db = {};
db.conn = pgp(connectionString);

module.exports = db;
