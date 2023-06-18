export const AccountTypeEnumeration = [
  'USER',
  'DESIGNER',
] as const;

export type AccountType = typeof AccountTypeEnumeration[0]
  | typeof AccountTypeEnumeration[1];


export const HouseTypeEnumeration = [
  'FAMILY_HOUSE',
  'BUNGALOW',
  'APARTMENT',
  'COTTAGE',
  'MANSION',
] as const;

export type HouseType = typeof HouseTypeEnumeration[0]
  | typeof HouseTypeEnumeration[1]
  | typeof HouseTypeEnumeration[2]
  | typeof HouseTypeEnumeration[3]
  | typeof HouseTypeEnumeration[4];

export const HouseOrdering = ['createdAt', 'updatedAt', 'cost'] as const;

