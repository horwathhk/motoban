const express = require("express");
const GraphQLHTTP = require("express-graphql");
const app = express();
const router = express.Router();
const users = require("./data/users.js");
const bikes = require("./data/bikes.js");
const motobanSchema = require("./data/motoban.js");
const cors = require("cors");

//allow cross-origin request
app.use(cors());

app.use(
  "/users",
  GraphQLHTTP({
    schema: users,
    graphiql: true
  })
);

app.use(
  "/bikes",
  GraphQLHTTP({
    schema: bikes,
    graphiql: true
  })
);

app.use(
  "/motoban",
  GraphQLHTTP({
    schema: motobanSchema,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" });
});

//user routes

app.listen(4000);
console.log("app running on port ", 4000);
