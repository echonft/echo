import type { Listing } from '@echo/model/types/listing'
import { ListingStackLayout } from '@echo/ui/components/listing/stack/layout/listing-stack-layout'
import { NftStackPicture } from '@echo/ui/components/nft/stack/nft-stack-picture'
import { getListingNftStack } from '@echo/ui/helpers/listing/get-listing-nft-stack'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  listing: Listing
  onClick?: MouseEventHandler
}

export const ListingStack: FunctionComponent<Props> = ({ listing, onClick }) => {
  const stack = getListingNftStack(listing)
  return (
    <ListingStackLayout onClick={onClick}>
      <NftStackPicture stack={stack} />
      {/*<NftStackTitle stack={stack} />*/}
    </ListingStackLayout>
  )
}
