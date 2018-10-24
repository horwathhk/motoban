const express = require("express");
const GraphQLHTTP = require("express-graphql");
const app = express();
const schema = require("./data/schema.js");

app.use(
  "/graphql",
  GraphQLHTTP({
    schema: schema,
    graphiql: true
  })
);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" });
});

app.listen(3000);
console.log("app running on port ", 3000);
