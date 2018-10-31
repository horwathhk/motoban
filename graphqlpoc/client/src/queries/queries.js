import { gql } from "apollo-boost";

const getUsersQuery = gql`
  {
    users {
      username
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

export { getUsersQuery, addUserMutation };
