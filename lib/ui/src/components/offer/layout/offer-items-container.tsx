import { type OfferItem } from '@echo/model/types/offer-item'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import type { Alignment } from '@echo/ui/types/alignment'
import { map, prop } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  items: OfferItem[]
  alignment?: Alignment
}

export const OfferItemsContainer: FunctionComponent<Props> = ({ alignment, items }) => {
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return <NftsContainer nfts={nfts} alignment={alignment} />
}
