const express = require("express");
const GraphQLHTTP = require("express-graphql");
const app = express();
const router = express.Router();
const users = require("./data/users.js");
const bikes = require("./data/bikes.js");
const motobanSchema = require("./data/motoban.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const SECRET = "billybobthorton";

//jwt.verify isn't recieving the jwt token
const addUser = async req => {
  const token = req.headers.authorization;
  console.log("this is recieved " + token);
  try {
    const { user } = await jwt.verify(token, SECRET);
    req.user = user;
    console.log("this is user in server.js" + user);
  } catch (err) {
    console.log(err);
  }
  req.next();
};
//allow cross-origin request
app.use(cors());
app.use(addUser);

app.use(
  "/graphiql",
  GraphQLHTTP({
    endpointURL: "/graphql"
  })
);

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
  GraphQLHTTP(req => ({
    schema: motobanSchema,
    graphiql: true,
    context: {
      SECRET,
      user: req.user
    }
  }))
);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" });
});

//user routes

app.listen(4000);
console.log("app running on port ", 4000);
