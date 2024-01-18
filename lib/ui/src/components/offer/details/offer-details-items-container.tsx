import { type Item } from '@echo/model/types/item'
import { NftsContainer } from '@echo/ui/components/nft/layout/nfts-container'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { map, prop } from 'ramda'
import { type FunctionComponent, useMemo } from 'react'

interface Props {
  items: Item[]
}

export const OfferDetailsItemsContainer: FunctionComponent<Props> = ({ items }) => {
  const nfts = useMemo(() => map(prop('nft'), items), [items])
  return <NftsContainer nfts={nfts} alignment={ALIGNMENT_CENTER} />
}
