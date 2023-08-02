import { NftAttribute } from '@echo/model'

export const mapTraitFilters = (traitFilters: Map<string, string[]>): NftAttribute[] => {
  const attributes = new Array<NftAttribute>()
  traitFilters.forEach((values, trait) => {
    values.forEach((value) => {
      attributes.push({
        trait,
        value
      })
    })
  })
  return attributes
}
