import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      token
      user {
        _id
        username
        cuisine
      }
    }
  }
`;

export const LOGIN = gql`
    mutation login($username: String!, $$password: String!) {
        login(username: $$username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;
