import { mapNftTraitsToNftAttributes } from '@echo/ui/mappers/map-nft-traits-to-nft-attributes'
import type { Nft } from '@echo/ui/types/model/nft'
import type { NftAttribute } from '@echo/ui/types/model/nft-attribute'
import type { NftTraits } from '@echo/ui/types/model/nft-traits'
import { intersects } from '@echo/utils/fp/intersects'
import { eqProps, filter, groupWith, head, isEmpty, pipe, prop, tail } from 'ramda'

function filterNftByAttributes(nfts: Nft[], attributesGroups: NftAttribute[][]) {
  if (isEmpty(attributesGroups)) {
    return nfts
  }
  const attributes = head(attributesGroups)
  const filteredNfts = filter(pipe(prop('attributes'), intersects(attributes!)))(nfts)
  return filterNftByAttributes(filteredNfts, tail(attributesGroups))
}

export function filterNftsByTraits(nfts: Nft[], traits: NftTraits) {
  if (isEmpty(traits)) {
    return nfts
  }
  const attributes = mapNftTraitsToNftAttributes(traits)
  if (isEmpty(attributes)) {
    return nfts
  }
  const groupedAttributes = groupWith<NftAttribute>(eqProps('trait'), attributes)
  return filterNftByAttributes(nfts, groupedAttributes)
}
