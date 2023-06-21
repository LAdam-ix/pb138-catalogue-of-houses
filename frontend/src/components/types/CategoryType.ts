export type CategoryType = 'FAMILY_HOUSE' |'BUNGALOW' |'APARTMENT' |'COTTAGE' |'MANSION'


export const CategoryEnum = [ 
  {value: 'FAMILY_HOUSE', label: "Family House"},
  {value: 'BUNGALOW', label: "Bungalow"},
  {value: 'APARTMENT', label: "Apartment"},
  {value: 'COTTAGE', label: "Cottage"},
  {value: 'MANSION', label: "Mansion"},
  ]

export const getCategoryString = (value: string) => {
  return CategoryEnum.find(category => category.value === value)?.label
}