import { NftAttribute } from '../types/nft-attribute'
import { NftTraits } from '../types/nft-traits'
import isNilOrEmpty from '@echo/utils/is-nil-or-empty'
import { forEachObjIndexed } from 'ramda'

export function mapNftTraitsToNftAttributes(nftTraits: NftTraits): NftAttribute[] {
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
  }, nftTraits)
  return attributes
}
