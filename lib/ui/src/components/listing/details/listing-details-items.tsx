import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { CardsLayout } from '@echo/ui/components/base/card/layout/cards-layout'
import { NftCard } from '@echo/ui/components/nft/card/nft-card'
import { keyOf } from '@echo/ui/components/nft/key-of'
import { Alignment } from '@echo/ui/constants/alignments'
import { map, type NonEmptyArray } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  items: NonEmptyArray<OwnedNft>
}

export const ListingDetailsItems: FunctionComponent<Props> = ({ items }) => (
  <CardsLayout alignment={Alignment.Center}>
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
