const express = require("express");
const GraphQLHTTP = require("express-graphql");
const app = express();
const router = express.Router();
const users = require("./data/users.js");

app.use(
  "/users",
  GraphQLHTTP({
    schema: users,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" });
});

//user routes

app.listen(3000);
console.log("app running on port ", 3000);
