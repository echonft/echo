import { NftAttribute, NftTraits } from '@echo/model'
import { forEachObjIndexed } from 'ramda'

export const mapTraitFilters = (traitFilters: NftTraits): NftAttribute[] => {
  const attributes = new Array<NftAttribute>()
  forEachObjIndexed((values, trait) => {
    values.forEach((value) => {
      attributes.push({
        trait,
        value: value.value
      } as NftAttribute)
    })
  }, traitFilters)
  return attributes
}
