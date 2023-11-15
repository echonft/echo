import { type OfferItem } from '@echo/model/types/offer-item'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { ALIGNMENT_CENTER, ALIGNMENT_LEFT, ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { map, prop } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  items: OfferItem[]
  alignment?: typeof ALIGNMENT_LEFT | typeof ALIGNMENT_CENTER | typeof ALIGNMENT_RIGHT
}

export const OfferItemsContainer: FunctionComponent<Props> = ({ alignment, items }) => {
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return <NftsContainer nfts={nfts} alignment={alignment} />
}
