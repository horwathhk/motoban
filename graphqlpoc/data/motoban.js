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
    users_id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    token: { type: GraphQLString },
    bikes: { type: GraphQLList(BikeType) }
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
    bikes_id: { type: GraphQLInt },
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
    bikes_details_id: { type: GraphQLID },
    bikes_id: { type: GraphQLID },
    bikes_id_fkey: { type: GraphQLID },
    bikes_makers_id_fkey: { type: GraphQLID },
    bikes_models_id_fkey: { type: GraphQLID },
    year: { type: GraphQLInt },
    transmission: { type: GraphQLInt },
    bikes_conditions_id_fkey: { type: GraphQLID },
    bikes_makers_name: { type: GraphQLString },
    bikes_models_name: { type: GraphQLString },
    bikes_conditions: { type: GraphQLString },
    users_id_fkey: { type: GraphQLID },
    users_id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});
let BikeOfStoreType = new GraphQLObjectType({
  name: "bikeOfStore",
  fields: () => ({
    bikes_rentals_locations_id: { type: GraphQLID },
    bikes_rentals_id_fkey: { type: GraphQLID },
    stores_id_fkey: { type: GraphQLID },
    bikes_rentals_id: { type: GraphQLID },
    bikes_id_fkey: { type: GraphQLID },
    bikes_rentals_isAvailable: { type: GraphQLBoolean },
    renters_id_fkey: { type: GraphQLID },
    bikes_id: { type: GraphQLID },
    users_id_fkey: { type: GraphQLID },
    bikes_details_id: { type: GraphQLID },
    bikes_makers_id_fkey: { type: GraphQLID },
    bikes_models_id_fkey: { type: GraphQLID },
    year: { type: GraphQLInt },
    transmission: { type: GraphQLInt },
    bikes_conditions_id_fkey: { type: GraphQLID },
    bikes_conditions_id: { type: GraphQLID },
    bikes_conditions_type: { type: GraphQLString },
    bikes_conditions_description: { type: GraphQLString },
    bikes_makers_name: { type: GraphQLString },
    bikes_models_name: { type: GraphQLString }
  })
});
let BikeDetailsType = new GraphQLObjectType({
  name: "bikeDetails",
  fields: () => ({
    bike_details_id: { type: GraphQLID },
    bikes_id_fkey: { type: GraphQLID },
    bikes_makers_id_fkey: { type: GraphQLID },
    bikes_models_id_fkey: { type: GraphQLID },
    bikes_conditions_id_fkey: { type: GraphQLID },
    year: { type: GraphQLInt },
    transmission: { type: GraphQLInt }
  })
});
let StoreType = new GraphQLObjectType({
  name: "Store",
  fields: () => ({
    stores_details_id: { type: GraphQLID },
    stores_id_fkey: { type: GraphQLInt },
    store_name: { type: GraphQLString },
    locations_countries_id_fkey: { type: GraphQLID },
    locations_cities_id_fkey: { type: GraphQLID },
    store_address: { type: GraphQLString },
    store_phone: { type: GraphQLString },
    store_phone_country_code: { type: GraphQLString },
    store_website: { type: GraphQLString },
    store_description: { type: GraphQLString },
    store_hours: { type: GraphQLString },
    store_email: { type: GraphQLString },
    renters_id: { type: GraphQLID },
    users_id_fkey: { type: GraphQLID },
    users_id: { type: GraphQLID },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

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
        console.log(context);
        console.log(context.user);
        let currentUser = context.user;
        console.log(currentUser.user_id);
        // let users = user.user_id;
        // console.log(user);
        let query = "";
        if (currentUser) {
          query =
            'SELECT * FROM public."users" WHERE users_id=' +
            currentUser.users_id;
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
      args: { bikes_id_fkey: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, args) {
        const query = `SELECT  
        bikes_details.*, 
        bikes_makers.bikes_makers_name, 
        bikes_models.bikes_models_name,
        bikes_conditions.bikes_conditions_description, 
        users.*
        
      FROM bikes_details
      INNER JOIN bikes_conditions ON bikes_conditions.bikes_conditions_id = bikes_details.bikes_conditions_id_fkey
      INNER JOIN bikes_makers on bikes_makers.bikes_makers_id = bikes_details.bikes_makers_id_fkey
      LEFT JOIN bikes_models on bikes_models.bikes_models_id = bikes_details.bikes_models_id_fkey
      INNER JOIN bikes on bikes_details.bikes_id_fkey = bikes.bikes_id
      INNER JOIN users on users.users_id = bikes.users_id_fkey
      
      WHERE bikes_id_fkey =${args.bikes_id_fkey} `;
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
        const query = `SELECT  
        bikes_details.*, 
        bikes_makers.bikes_makers_name, 
        bikes_models.bikes_models_name,
        bikes_conditions.bikes_conditions_descriptions, 
        users.*
        
      FROM bikes_details
      INNER JOIN bikes_conditions ON bikes_conditions.bikes_conditions_id = bikes_details.bikes_conditions_id_fkey
      INNER JOIN bikes_makers on bikes_makers.bikes_makers_id = bikes_details.bikes_makers_id_fkey
      LEFT JOIN bikes_models on bikes_models.bikes_models_id = bikes_details.bikes_models_id_fkey
      INNER JOIN bikes on bikes_details.bikes_id_fkey = bikes.bikes_id
      INNER JOIN users on users.users_id = bikes.users_id_fkey`;
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
    },

    stores: {
      type: new GraphQLList(StoreType),
      args: { id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT  
        stores_details.*,
        renters.*,
        users.*
      FROM stores_details
      INNER JOIN stores on stores_details.stores_id_fkey = stores.stores_id
      INNER JOIN renters on renters.renters_id = stores.renters_id_fkey
      INNER JOIN users on users.users_id = renters.users_id_fkey
      `;
        return db.conn
          .any(query)
          .then(data => {
            console.log("from server");
            console.log(data);
            return data;
          })
          .catch(err => {
            return "The error is", err;
          });
      }
    },
    bikesOfStore: {
      type: new GraphQLList(BikeOfStoreType),
      args: { store_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT  
                      bikes_rentals_locations.*,
                      bikes_rentals.*,
                      bikes.*,
                      bikes_details.*,
                      bikes_conditions.*,
                      bikes_makers.bikes_makers_name, 
	                    bikes_models.bikes_models_name
	
                      FROM bikes_rentals_locations
                      INNER JOIN bikes_rentals ON bikes_rentals.bikes_rentals_id = bikes_rentals_locations.bikes_rentals_id_fkey
                      INNER JOIN bikes ON bikes.bikes_id = bikes_rentals.bikes_id_fkey
                      INNER JOIN bikes_details on bikes_details_id = bikes_id
                      LEFT JOIN bikes_conditions ON bikes_conditions.bikes_conditions_id = bikes_details.bikes_conditions_id_fkey
                      INNER JOIN bikes_makers on bikes_makers.bikes_makers_id = bikes_details.bikes_makers_id_fkey
                      LEFT JOIN bikes_models on bikes_models.bikes_models_id = bikes_details.bikes_models_id_fkey

                      WHERE stores_id_fkey = ${args.store_id}`;
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
    bikesOfStoreLimitTwo: {
      type: new GraphQLList(BikeOfStoreType),
      args: { store_id: { type: GraphQLID } },
      resolve(parentValue, args) {
        const query = `SELECT  
                      bikes_rentals_locations.*,
                      bikes_rentals.*,
                      bikes.*,
                      bikes_details.*,
                      bikes_conditions.*,
                      bikes_makers.bikes_makers_name, 
	                    bikes_models.bikes_models_name
	
                      FROM bikes_rentals_locations
                      INNER JOIN bikes_rentals ON bikes_rentals.bikes_rentals_id = bikes_rentals_locations.bikes_rentals_id_fkey
                      INNER JOIN bikes ON bikes.bikes_id = bikes_rentals.bikes_id_fkey
                      INNER JOIN bikes_details on bikes_details_id = bikes_id
                      LEFT JOIN bikes_conditions ON bikes_conditions.bikes_conditions_id = bikes_details.bikes_conditions_id_fkey
                      INNER JOIN bikes_makers on bikes_makers.bikes_makers_id = bikes_details.bikes_makers_id_fkey
                      LEFT JOIN bikes_models on bikes_models.bikes_models_id = bikes_details.bikes_models_id_fkey

                      WHERE stores_id_fkey = ${args.store_id} LIMIT 2`;
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
        password: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, args, { SECRET }) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(args.password, salt, (err, hash) => {
            args.password = hash;
            // let query =
            return db.conn
              .any(
                'INSERT INTO public."users"(username, password, email) VALUES($1, $2, $3)',
                [`${args.username}`, `${args.password}`, `${args.username}`]
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
          console.log(user.users_id);
          // console.log("user at sign in " + user.user_id + user.username);
          const valid = bcrypt.compare(args.password, user.password);
          if (!valid) {
            throw new Error("incorrect password");
          } else {
            console.log("valid!");
          }
          let token = jwt.sign(
            {
              user: _.pick(user, ["users_id", "username"])
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
        users_id_fkey: { type: new GraphQLNonNull(GraphQLInt) }
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
            (users_id_fkey) VALUES($1) RETURNING bikes_id`,
            [`${args.users_id_fkey}`]
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
    addBikeDetails: {
      type: BikeDetailsType,
      args: {
        bikes_id_fkey: { type: new GraphQLNonNull(GraphQLID) },
        bikes_makers_id_fkey: { type: GraphQLID },
        bikes_models_id_fkey: { type: GraphQLID },
        bikes_conditions_id_fkey: { type: GraphQLID },
        year: { type: GraphQLInt },
        transmission: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return db.conn
          .any(
            `INSERT INTO public."bikes_details"
            (bikes_id_fkey, bikes_makers_id_fkey, bikes_conditions_id_fkey, bikes_models_id_fkey, year, transmission) VALUES($1, $2, $3, $4, $5, $6) RETURNING bikes_details_id`,
            [
              `${args.bikes_id_fkey}`,
              `${args.bikes_makers_id_fkey}`,
              `${args.bikes_models_id_fkey}`,
              `${args.bikes_conditions_id_fkey}`,
              `${args.year}`,
              `${args.transmission}`
            ]
          )
          .then(data => {
            console.log(data);
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
