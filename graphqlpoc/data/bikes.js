const graphql = require("graphql");
const db = require("./dbconn.js");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLNonNull
} = graphql;

let BikeType = new GraphQLObjectType({
  name: "bike",
  fields: () => ({
    bike_id: { type: GraphQLID },
    users_id_fkey: { type: GraphQLInt },
    bikes_id_fkey: { type: GraphQLInt },
    maker: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    description: { type: GraphQLString },
    condition: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    bike: {
      type: BikeType,
      args: { bike_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."bikes" b inner join public."bikes_descriptions" bd on b.bike_id = bd.bikes_id_fkey WHERE bike_id=${args.bike_id} `;
        return db.conn
          .one(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    },
    bikes: {
      type: new GraphQLList(BikeType),
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."bikes" b 
                        inner join 
                    public."bikes_descriptions" bd 
                        on 
                    b.bike_id = bd.bikes_id_fkey`;
        return db.conn
          .any(query)
          .then(data => {
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
