import type { NftAttribute } from '@echo/ui/types/model/nft-attribute'
import type { NftTraits } from '@echo/ui/types/model/nft-traits'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
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
