import type { ListingItem } from '@echo/model/types/listing-item'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCard } from '@echo/ui/components/nft/card/nft-card'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
}

export const ListingDetailsItemsContainer: FunctionComponent<Props> = ({ items }) => (
  <CardsLayout alignment={ALIGNMENT_CENTER}>
    {map(
      (item) => (
        <NftCard
          nft={item.nft}
          // TODO Validate this behaviour
          key={`${item.nft.collection.name}-${item.nft.tokenId}`}
          options={{ owner: { hide: true }, style: { hideOpenSeaLink: true, scaleDisabled: true } }}
        />
      ),
      items
    )}
  </CardsLayout>
)
