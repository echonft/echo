import type { Listing } from '@echo/model/types/listing'
import type { Nft } from '@echo/model/types/nft'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import { clsx } from 'clsx'
import { head, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  scaleDisabled?: boolean
}

export const ListingCardPicture: FunctionComponent<Props> = ({ listing, scaleDisabled }) => {
  const nft = pipe<[Listing], Nft[], Nft>(prop('items'), head)(listing)
  return (
    <CardPictureLayout>
      {/*  TODO Validate this behaviour, might cause display issues */}
      <CardImage src={nft.pictureUrl ?? ''} alt={nft.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <ListingCardStatus listing={listing} />
      </div>
    </CardPictureLayout>
  )
}
