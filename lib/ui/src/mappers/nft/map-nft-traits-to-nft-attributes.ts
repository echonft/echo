import { NftAttribute } from '../../types/nft-attribute'
import { NftTraits } from '../../types/nft-traits'
import { isNilOrEmpty } from '@echo/utils'
import { forEachObjIndexed } from 'ramda'

export const mapNftTraitsToNftAttributes = (traitFilters: NftTraits): NftAttribute[] => {
  const attributes = new Array<NftAttribute>()
  forEachObjIndexed((values, trait) => {
    values.forEach((value) => {
      if (!isNilOrEmpty(value.value)) {
        attributes.push({
          trait,
          value: value.value
        } as NftAttribute)
      }
    })
  }, traitFilters)
  return attributes
}
