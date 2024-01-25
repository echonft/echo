import type { Item } from '@echo/model/types/item'
import { NftCardsContainer } from '@echo/ui/components/nft/card/layout/nft-cards-container'
import type { Alignment } from '@echo/ui/types/alignment'
import { map, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: Item[]
  alignment?: Alignment
}

export const ItemsContainer: FunctionComponent<Props> = ({ alignment, items }) => {
  return <NftCardsContainer nfts={map(prop('nft'), items)} alignment={alignment} />
}
