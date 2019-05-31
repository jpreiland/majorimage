import { gql } from 'apollo-boost';

const getItemsQuery = gql`
  {
    items {
      name
    }
  }
`

export { getItemsQuery };