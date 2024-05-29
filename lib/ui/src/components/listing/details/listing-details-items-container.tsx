import type { Nft } from '@echo/model/types/nft'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCard } from '@echo/ui/components/nft/card/nft-card'
import { keyOf } from '@echo/ui/components/nft/key-of'
import { ALIGNMENT_CENTER } from '@echo/ui/constants/alignments'
import { map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  items: Nft[]
}

export const ListingDetailsItemsContainer: FunctionComponent<Props> = ({ items }) => (
  <CardsLayout alignment={ALIGNMENT_CENTER}>
    {map(
      (nft) => (
        <NftCard
          nft={nft}
          key={keyOf(nft)}
          options={{ owner: { hide: true }, style: { hideOpenSeaLink: true, scaleDisabled: true } }}
        />
      ),
      items
    )}
  </CardsLayout>
)
