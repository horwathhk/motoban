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
      users_id_fkey
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

export {
  getUsersQuery,
  getUserQuery,
  getCurrentUserQuery,
  getBikesQuery,
  addUserMutation,
  signinMutation
};
