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
    token: { type: GraphQLString },
    bikes: { type: GraphQLList(BikeType) }
  })
});
let SigninResponseType = new GraphQLObjectType({
  name: "SigninResponse",
  fields: () => ({
    ok: { type: GraphQLBoolean },
    token: { type: GraphQLString },
    user_id: { type: GraphQLID },
    username: { type: GraphQLString }
  })
});

let UserProfileType = new GraphQLObjectType({
  name: "UserProfile",
  fields: () => ({
    user_id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    phone: { type: GraphQLString },
    // bikes_id_fkey: { type: GraphQLList },
    bike_id: { type: GraphQLInt },
    maker: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    model: { type: GraphQLString },
    description: { type: GraphQLString },
    condition: { type: GraphQLString },
    transmission: { type: GraphQLInt }
  })
});

let BikeType = new GraphQLObjectType({
  name: "bike",
  fields: () => ({
    bike_id: { type: GraphQLID },
    user_id_fkey: { type: GraphQLInt },
    bikes_id_fkey: { type: GraphQLInt },
    maker: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    description: { type: GraphQLString },
    condition: { type: GraphQLString },
    transmission: { type: GraphQLInt },
    location: { type: GraphQLString },
    bike_price: { type: GraphQLInt },
    maker: { type: GraphQLString }
  })
});
let BikeDescriptionType = new GraphQLObjectType({
  name: "bikeDescription",
  fields: () => ({
    bikes_id_fkey: { type: GraphQLInt },
    maker: { type: GraphQLString },
    model: { type: GraphQLString },
    year: { type: GraphQLInt },
    description: { type: GraphQLString },
    condition: { type: GraphQLString },
    transmission: { type: GraphQLInt },
    location: { type: GraphQLString },
    bike_price: { type: GraphQLInt }
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
    currentUser: {
      type: UserType,
      args: null,
      resolve(parentValue, args, context, { user }) {
        console.log("context");
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
            console.log(data);
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
    getUserProfile: {
      type: UserProfileType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLID) },
        user_id: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        const query = `SELECT * FROM public.users u INNER JOIN public.user_details ud ON u.user_id = ud.users_id_fkey INNER JOIN public.bikes b ON  b.user_id_fkey = u.user_id INNER JOIN public.bikes_descriptions bd ON bd.bikes_id_fkey = b.bike_id WHERE u.user_id=${
          args.user_id
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

    bike: {
      type: BikeType,
      args: { bike_id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        const query = `SELECT * FROM public."bikes" b inner join public."bikes_descriptions" bd on b.bike_id = bd.bikes_id_fkey WHERE bike_id=${
          args.bike_id
        } `;
        return db.conn
          .one(query)
          .then(data => {
            console.log("one result!");
            console.log(data);
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
            console.log(data);
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
        id: { type: GraphQLID },
        username: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, { SECRET }) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(args.password, salt, (err, hash) => {
            args.password = hash;
            // let query =
            return db.conn
              .any(
                'INSERT INTO public."users"(username, password) VALUES($1, $2)',
                [`${args.username}`, `${args.password}`]
              )
              .then(user => {
                console.log(user);
                // console.log("user at sign in " + user.user_id + user.username);
                let token = jwt.sign(
                  {
                    user: _.pick(user, ["user_id", "username"])
                  },
                  SECRET,
                  {
                    expiresIn: "7d"
                  }
                );
                console.log(token);
                user.token = token;
                return user;
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
        let query =
          'SELECT * FROM public."users" WHERE username=\'' +
          args.username +
          "'";
        // +
        // "AND password='" +
        // args.password +
        // "'";

        return db.conn.one(query).then(user => {
          console.log(query);
          console.log("user.password");
          console.log(user.password);
          console.log(user.user_id);
          // console.log("user at sign in " + user.user_id + user.username);
          const valid = bcrypt.compare(args.password, user.password);
          if (!valid) {
            throw new Error("incorrect password");
          } else {
            console.log("valid!");
          }
          let token = jwt.sign(
            {
              user: _.pick(user, ["user_id", "username"])
            },
            SECRET,
            {
              expiresIn: "7d"
            }
          );
          console.log("token " + token);
          user.token = token;
          return user;
        });
      }
    },
    addBikeToUser: {
      type: BikeType,
      args: {
        id: { type: GraphQLID },
        user_id_fkey: { type: new GraphQLNonNull(GraphQLInt) }
        // bikes_id_fkey: { type: new GraphQLNonNull(GraphQLInt) }
        // maker: { type: new GraphQLNonNull(GraphQLString) },
        // model: { type: new GraphQLNonNull(GraphQLString) },
        // year: { type: new GraphQLNonNull(GraphQLInt) },
        // description: { type: new GraphQLNonNull(GraphQLString) },
        // condition: { type: new GraphQLNonNull(GraphQLString) },
        // transmission: { type: new GraphQLNonNull(GraphQLInt) },
        // location: { type: new GraphQLNonNull(GraphQLString) },
        // star_rating: { type: new GraphQLNonNull(GraphQLInt) },
        // bike_price: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parentValue, args) {
        return db.conn
          .any(
            `INSERT INTO public."bikes"
            (user_id_fkey) VALUES($1) RETURNING bike_id`,
            [`${args.user_id_fkey}`]
          )
          .then(data => {
            console.log("from add bikes");
            console.log(args);
            console.log("data");
            let data_id = data[0];
            console.log(data[0]);
            return data_id;
            // success; .then(user => {
          })
          .catch(err => {
            return "the error is", err;
          });
      }
    },
    addBikeDescription: {
      type: BikeDescriptionType,
      args: {
        bikes_id_fkey: { type: new GraphQLNonNull(GraphQLInt) },
        maker: { type: new GraphQLNonNull(GraphQLString) },
        year: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        condition: { type: new GraphQLNonNull(GraphQLString) },
        transmission: { type: new GraphQLNonNull(GraphQLInt) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        bike_price: { type: new GraphQLNonNull(GraphQLInt) },
        model: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args) {
        return db.conn
          .any(
            `INSERT INTO public."bikes_descriptions"
            (bikes_id_fkey, maker, year, description, condition, transmission, location, bike_price, model) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
            [
              `${args.bikes_id_fkey}`,
              `${args.maker}`,
              `${args.year}`,
              `${args.description}`,
              `${args.condition}`,
              `${args.transmission}`,
              `${args.location}`,
              `${args.bike_price}`,
              `${args.model}`
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
