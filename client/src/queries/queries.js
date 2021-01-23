import { gql } from 'apollo-boost';

const getDataQuery = gql`
  query Items(
      $isArmor: Boolean,
      $isClothing: Boolean,
      $isContainer: Boolean,
      $isFurniture: Boolean,
      $isMisc: Boolean,
      $isTreasure: Boolean,
      $isWeapon: Boolean,
      $isWriting: Boolean
      ) {
    items(
      isArmor: $isArmor,
      isClothing: $isClothing,
      isContainer: $isContainer,
      isFurniture: $isFurniture,
      isMisc: $isMisc,
      isTreasure: $isTreasure,
      isWeapon: $isWeapon,
      isWriting: $isWriting
    ) {
      name
    }
    qualities(
      isArmor: $isArmor,
      isClothing: $isClothing,
      isContainer: $isContainer,
      isFurniture: $isFurniture,
      isMisc: $isMisc,
      isTreasure: $isTreasure,
      isWeapon: $isWeapon,
      isWriting: $isWriting
    ) {
      name
    }
    colors(
      isArmor: $isArmor,
      isClothing: $isClothing,
      isContainer: $isContainer,
      isFurniture: $isFurniture,
      isMisc: $isMisc,
      isTreasure: $isTreasure,
      isWeapon: $isWeapon,
      isWriting: $isWriting
    ) {
      name
    }
    materials(
      isArmor: $isArmor,
      isClothing: $isClothing,
      isContainer: $isContainer,
      isFurniture: $isFurniture,
      isMisc: $isMisc,
      isTreasure: $isTreasure,
      isWeapon: $isWeapon,
      isWriting: $isWriting
    ) {
      name
    }
  }
`

export { getDataQuery };