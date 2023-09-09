import { mapNftTraitsToNftAttributes, Nft, NftAttribute, NftTraits } from '@echo/ui-model'
import { intersects } from '@echo/utils'
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
