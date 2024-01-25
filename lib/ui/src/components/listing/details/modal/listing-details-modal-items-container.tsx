import type { ListingItem } from '@echo/model/types/listing-item'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftThumbnail } from '@echo/ui/components/nft/thumbnail/nft-thumbnail'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
}

export const ListingDetailsModalItemsContainer: FunctionComponent<Props> = ({ items }) => (
  <CardsLayout alignment={ALIGNMENT_CENTER}>
    {map(
      (item) => (
        <NftThumbnail nft={item.nft} key={item.nft.id} />
      ),
      items
    )}
  </CardsLayout>
)
