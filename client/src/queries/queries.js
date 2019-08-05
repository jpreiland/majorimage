import { gql } from 'apollo-boost';

const getItemsQuery = gql`
  query Items(
      $isArmor: Boolean,
      $isClothing: Boolean,
      $isContainer: Boolean,
      $isFurniture: Boolean,
      $isMisc: Boolean,
      $isTreasure: Boolean
      $isWriting: Boolean
      ) {
    items(
      isArmor: $isArmor,
      isClothing: $isClothing,
      isContainer: $isContainer,
      isFurniture: $isFurniture,
      isMisc: $isMisc,
      isTreasure: $isTreasure
      isWriting: $isWriting
    ) {
      name
    }
  }
`

export { getItemsQuery };