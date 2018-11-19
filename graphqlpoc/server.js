const express = require("express");
const GraphQLHTTP = require("express-graphql");
const app = express();
const router = express.Router();
const users = require("./data/users.js");
const bikes = require("./data/bikes.js");
const motobanSchema = require("./data/motoban.js");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { bodyParserGraphQL } = require("body-parser-graphql");
var bodyParser = require("body-parser");

const SECRET = "billybobthorton";

//jwt.verify isn't recieving the jwt token
const addUser = async req => {
  const token = req.headers.authorization;
  console.log("this is recieved " + token);
  try {
    const tokenArray = token.split(".");
    const selectedArray = tokenArray.slice(0, 3);
    const realtoken = selectedArray.join(".");
    console.log("token being used " + realtoken);
    let { user } = await jwt.verify(realtoken, SECRET);
    req.user = user;
    localStorage.setItem("token", realtoken);
    localStorage.setItem("userId", user.user_id);
    // let users = user.user_id;
    // console.log("user" + "" + user.username + " " + user.user_id);
    // console.log("users " + users);
    console.log(user);
  } catch (err) {
    console.log("err" + err + token);
  }
  req.next();
};
//allow cross-origin request
app.use("*", cors({ origin: "http://localhost:3000", credentials: true }));
app.use(addUser);
app.use(bodyParserGraphQL());
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );

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
  [bodyParser.json()],
  GraphQLHTTP(req => {
    console.log(req.user);
    return {
      schema: motobanSchema,
      graphiql: true,
      context: {
        SECRET,
        user: req.user
      }
    };
  })
);

// app.use("/graphql", [auth_middleware, bodyParser.json()], (req, res) =>
//   graphqlExpress({ schema, context: req.user })(req, res)
// );

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ message: "YAY! Congratulations! Your first endpoint is working" });
});

//user routes

app.listen(4000);
console.log("app running on port ", 4000);
