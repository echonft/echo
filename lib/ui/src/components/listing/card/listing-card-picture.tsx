import { getListingItems } from '@echo/model/helpers/listing/get-listing-items'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { Nft } from '@echo/model/types/nft'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import { classes } from '@echo/ui/helpers/classes'
import { nonEmptyReturn } from '@echo/utils/fp/non-empty-return'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { head, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  scaleDisabled?: boolean
}

export const ListingCardPicture: FunctionComponent<Props> = ({ listing, scaleDisabled }) => {
  const nft = pipe<[Listing], NonEmptyArray<ListingItem>, ListingItem, Nft>(
    nonEmptyReturn(getListingItems),
    head,
    nonNullableReturn(prop('nft'))
  )(listing)
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nft.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <div className={classes('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <ListingCardStatus listing={listing} />
      </div>
    </CardPictureLayout>
  )
}
