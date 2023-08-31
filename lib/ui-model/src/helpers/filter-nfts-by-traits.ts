import { mapNftTraitsToNftAttributes } from '../mappers/map-nft-traits-to-nft-attributes'
import { Nft } from '../types/nft'
import { NftAttribute } from '../types/nft-attribute'
import { NftTraits } from '../types/nft-traits'
import { intersects } from '@echo/utils'
import { eqProps, filter, groupWith, head, isEmpty, isNil, pipe, prop, tail } from 'ramda'

function filterNftByAttributes(nfts: Nft[], attributesGroups: NftAttribute[][]) {
  if (isEmpty(attributesGroups)) {
    return nfts
  }
  const attributes = head(attributesGroups)
  const filteredNfts = filter(pipe(prop('attributes'), intersects(attributes!)))(nfts)
  return filterNftByAttributes(filteredNfts, tail(attributesGroups))
}

export function filterNftsByTraits(nfts: Nft[], traits: NftTraits | undefined) {
  if (isNil(traits)) {
    return nfts
  }
  const attributes = mapNftTraitsToNftAttributes(traits)
  if (isEmpty(attributes)) {
    return nfts
  }
  const groupedAttributes = groupWith<NftAttribute>(eqProps('trait'), attributes)
  return filterNftByAttributes(nfts, groupedAttributes)
}
