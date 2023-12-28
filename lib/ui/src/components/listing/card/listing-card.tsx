import type { Listing } from '@echo/model/types/listing'
import { ListingCardLayout } from '@echo/ui/components/listing/card/layout/listing-card-layout'
import { NftCardPicture } from '@echo/ui/components/nft/card/nft-card-picture'
import { NftCardTitle } from '@echo/ui/components/nft/card/nft-card-title'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { head } from 'ramda'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  listing: Listing
  onClick?: MouseEventHandler
}

export const ListingCard: FunctionComponent<Props> = ({ listing, onClick }) => {
  const { items } = listing
  if (isNonEmptyArray(items)) {
    const { nft } = head(items)
    return (
      <ListingCardLayout onClick={onClick}>
        <NftCardPicture nft={nft} hideLink={true} />
        <NftCardTitle nft={nft} />
      </ListingCardLayout>
    )
  }
  return null
}
