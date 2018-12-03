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
      user_id
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
  mutation($user_id_fkey: Int!) {
    addBikeToUser(user_id_fkey: $user_id_fkey) {
      user_id_fkey
      bike_id
    }
  }
`;

const addBikeDescriptionMutation = gql`
  mutation(
    $bikes_id_fkey: Int!
    $maker: String!
    $year: Int!
    $description: String!
    $condition: String!
    $transmission: Int!
    $location: String!
    $bike_price: Int!
    $model: String!
  ) {
    addBikeDescription(
      bikes_id_fkey: $bikes_id_fkey
      maker: $maker
      year: $year
      description: $description
      condition: $condition
      transmission: $transmission
      location: $location
      bike_price: $bike_price
      model: $model
    ) {
      bikes_id_fkey
      maker
      year
      description
      condition
      transmission
      location
      bike_price
      model
    }
  }
`;

export {
  getUsersQuery,
  getUserQuery,
  getCurrentUserQuery,
  getBikesQuery,
  addUserMutation,
  signinMutation,
  addBikeToUserMutation,
  addBikeDescriptionMutation
};
