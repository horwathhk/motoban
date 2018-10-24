const graphql = require("graphql");
const connectionString = "postgres://aaron:Makai645!@localhost:5432/motobanDB";
const pgp = require("pg-promise")();
const db = {};

db.conn = pgp(connectionString);

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = graphql;

let UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    pin: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."Users" WHERE id=${args.id}`;
        return db.conn
          .one(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
