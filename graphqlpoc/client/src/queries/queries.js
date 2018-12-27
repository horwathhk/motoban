import { gql } from "apollo-boost";

const getUsersQuery = gql`
  {
    users {
      username
    }
  }
`;

const getCurrentUserQuery = gql`
  {
    currentUser {
      users_id
      username
      token
    }
  }
`;

const getUserQuery = gql`
  {
    user {
      username
    }
  }
`;

const getBikeQuery = gql`
  query($bikes_id_fkey: ID!) {
    bike(bikes_id_fkey: $bikes_id_fkey) {
      bikes_details_id
      bikes_id_fkey
      bikes_makers_id_fkey
      bikes_models_id_fkey
      year
      transmission
      bikes_conditions_id_fkey
      bikes_makers_name
      bikes_models_name
      users_id
      username
      password
      email
    }
  }
`;

const getBikesQuery = gql`
  {
    bikes {
      bike_id
      user_id_fkey
      bikes_id_fkey
      maker
      model
      year
      description
      condition
      bike_price
    }
  }
`;
const getStoresQuery = gql`
  {
    stores {
      stores_details_id
      stores_id_fkey
      store_name
      locations_countries_id_fkey
      locations_cities_id_fkey
      store_address
      store_phone
      store_phone_country_code
      store_website
      store_description
      store_hours
      store_email
      renters_id
      users_id_fkey
      users_id
      username
      password
      email
    }
  }
`;

const getBikesOfStoreQuery = gql`
  query($store_id: ID!) {
    bikesOfStore(store_id: $store_id) {
      bikes_rentals_locations_id
      bikes_rentals_id_fkey
      stores_id_fkey
      bikes_rentals_id
      bikes_id_fkey
      bikes_rentals_isAvailable
      renters_id_fkey
      bikes_id
      users_id_fkey
      bikes_details_id
      bikes_makers_id_fkey
      bikes_models_id_fkey
      year
      transmission
      bikes_conditions_id_fkey
      bikes_conditions_id
      bikes_conditions_type
      bikes_conditions_description
      bikes_makers_name
      bikes_models_name
    }
  }
`;
const getBikesOfStoreLimitTwoQuery = gql`
  query($store_id: ID!) {
    bikesOfStoreLimitTwo(store_id: $store_id) {
      bikes_rentals_locations_id
      bikes_rentals_id_fkey
      stores_id_fkey
      bikes_rentals_id
      bikes_id_fkey
      bikes_rentals_isAvailable
      renters_id_fkey
      bikes_id
      users_id_fkey
      bikes_details_id
      bikes_makers_id_fkey
      bikes_models_id_fkey
      year
      transmission
      bikes_conditions_id_fkey
      bikes_conditions_id
      bikes_conditions_type
      bikes_conditions_description
      bikes_makers_name
      bikes_models_name
    }
  }
`;

const signinMutation = gql`
  mutation($username: String!, $password: String!) {
    signin(username: $username, password: $password) {
      username
      password
      token
    }
  }
`;

const addUserMutation = gql`
  mutation($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      username
      password
    }
  }
`;

const addBikeToUserMutation = gql`
  mutation($users_id_fkey: Int!) {
    addBikeToUser(users_id_fkey: $users_id_fkey) {
      users_id_fkey
      bikes_id
    }
  }
`;

const addBikeDetailsMutation = gql`
  mutation(
    $bikes_id_fkey: ID!
    $year: Int!
    $transmission: Int!
    $bikes_makers_id_fkey: ID!
    $bikes_models_id_fkey: ID!
    $bikes_conditions_id_fkey: ID!
  ) {
    addBikeDetails(
      bikes_id_fkey: $bikes_id_fkey
      bikes_makers_id_fkey: $bikes_makers_id_fkey
      year: $year
      transmission: $transmission
      bikes_models_id_fkey: $bikes_models_id_fkey
      bikes_conditions_id_fkey: $bikes_conditions_id_fkey
    ) {
      bikes_id_fkey
      bikes_makers_id_fkey
      bikes_models_id_fkey
      year
      transmission
      bikes_conditions_id_fkey
    }
  }
`;

export {
  getUsersQuery,
  getUserQuery,
  getCurrentUserQuery,
  getBikesQuery,
  getBikeQuery,
  getStoresQuery,
  getBikesOfStoreQuery,
  getBikesOfStoreLimitTwoQuery,
  addUserMutation,
  signinMutation,
  addBikeToUserMutation,
  addBikeDetailsMutation
};
