const graphql = require("graphql");
const db = require("./dbconn.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

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
  name: "User",
  fields: () => ({
    user_id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    bikes: { type: GraphQLList(BikeType) }
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
      args: {
        user_id: { type: GraphQLID },
        username: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        console.log("args from user" + args);
        let query = "";
        if (args.user_id) {
          query = 'SELECT * FROM public."users" WHERE user_id=' + args.user_id;
        } else if (args.username) {
          query =
            'SELECT * FROM public."users" WHERE username=\'' +
            args.username +
            "'";
        }
        console.log(query);
        return db.conn
          .one(query)
          .then(data => {
            console.log("data from promise in me" + data);
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    },
    me: {
      type: UserType,
      args: null,
      resolve(parentValue, args, context, { user }) {
        console.log(context.user);
        let currentUser = context.user;
        console.log(currentUser.user_id);
        // let users = user.user_id;
        // console.log(user);
        let query = "";
        if (currentUser) {
          query =
            'SELECT * FROM public."users" WHERE user_id=' + currentUser.user_id;
          console.log(currentUser);
        } else {
          console.log("not logged in");
        }
        return db.conn
          .one(query)
          .then(data => {
            console.log("data" + data);
            return data;
          })
          .catch(err => {
            return "not loggin in", err;
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

    addUser: {
      type: UserType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        let user =
          'INSERT INTO public."users" WHERE username=\'' +
          args.username +
          "'" +
          "AND password='" +
          args.password +
          "'";
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
        const query = `SELECT * FROM public."bikes" b inner join public."bikes_descriptions" bd on b.bike_id = bd.bikes_id_fkey WHERE bike_id=${
          args.bike_id
        } `;
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
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(args.password, salt, (err, hash) => {
            args.password = hash;
            let user =
              'INSERT INTO public."users" WHERE username=\'' +
              args.username +
              "'" +
              "AND password='" +
              args.password +
              "'";
            return db.conn
              .any(user)
              .then(data => {
                return data;
              })
              .catch(err => {
                return "The error is", err;
              });
          });
        });
      }
    },
    signin: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, args, { SECRET }) {
        //we are searching all which I think is returning it as an array of objects. We need user to be a single object

        // let query =
        //   'SELECT row_to_json(t) FROM ( SELECT username, password FROM public."users" WHERE username=\'' +
        //   args.username +
        //   "'" +
        //   "AND password='" +
        //   args.password +
        //   "') t";
        // console.log(query);
        let query =
          'SELECT * FROM public."users" WHERE username=\'' +
          args.username +
          "'" +
          "AND password='" +
          args.password +
          "'";
        return db.conn.one(query).then(user => {
          console.log(query);
          console.log(user);
          // console.log("user at sign in " + user.user_id + user.username);
          let token = jwt.sign(
            {
              user: _.pick(user, ["user_id", "username"])
            },
            SECRET,
            {
              expiresIn: "36000000000"
            }
          );
          console.log("token " + token);
          return token;
        });
      }
    },
    addBikeToUser: {
      type: BikeType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLID) },
        users_id_fkey: { type: new GraphQLNonNull(GraphQLInt) },
        bikes_id_fkey: { type: new GraphQLNonNull(GraphQLInt) },
        maker: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        condition: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return db.conn
          .any(
            `INSERT INTO public."bikes"
            (users_id_fkey) VALUES($1)`,
            [`${args.users_id_fkey}`]
          )
          .any(
            `INSERT INTO public."bikes_descriptions"
            (users_id_fkey) VALUES($1, $2, $3, $4, $5, $6)`,
            [
              `${args.bikes_id_fkey}`,
              `${args.maker}`,
              `${args.model}`,
              `${args.year}`,
              `${args.description}`,
              `${args.condition}`
            ]
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
