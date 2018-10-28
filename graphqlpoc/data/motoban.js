const graphql = require("graphql");
const db = require("./dbconn.js")

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

let UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    user_id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    bikes: { type: GraphQLList(BikeType)}
  })
});


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

// let UserWithAllBikesType = new GraphQLObjectType({
//   name: "userWithAllBikes",
//   fields: () => ({
//     user_id: { type: GraphQLID },
//     username: { type: GraphQLString },
//     password: { type: GraphQLString },
//     bikes: { type: GraphQLList(BikeType) }
//   })
// });

const RootQuery = new GraphQLObjectType({
  name: "MotobanSchema",
  fields: {
    user: {
      type: UserType,
      args: { user_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."users" WHERE user_id=${args.user_id}`;
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
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."users"`;
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
    bikesOfUser: {
      type: new GraphQLList(BikeType),
      args: { user_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM 
                        public."bikes" b
                          inner join
                        public."bikes_descriptions" bd
                          on b.bike_id = bd.bikes_id_fkey
                        WHERE b.users_id_fkey=${args.user_id}`;
        return db.conn
          .any(query)
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

//mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
        pin: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return db.conn
          .any(
            'INSERT INTO public."users"(username, password, pin) WHERE NOT EXISTS(username, password, pin) VALUES($1, $2, $3)',
            [`${args.username}`, `${args.password}`, `${args.pin}`]
          )
          .then(() => {
            return "success";
            // success;
          })
          .catch(err => {
            return "the error is", err;
          });
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return db.conn
          .one('DELETE FROM public."users" WHERE username=$1', [
            `${args.username}`
          ])
          .then(() => {
            return "success";
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
