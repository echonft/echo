import type { Listing } from '@echo/model/types/listing'
import { StackPictureLayout } from '@echo/ui/components/base/stack/layout/stack-picture-layout'
import { StackImage } from '@echo/ui/components/base/stack/stack-image'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import { classes } from '@echo/ui/helpers/classes'
import type { NftStack } from '@echo/ui/types/nft-stack'
import { type FunctionComponent } from 'react'

interface Props {
  stack: NftStack
  listing: Listing
  scaleDisabled?: boolean
}

export const ListingStackPicture: FunctionComponent<Props> = ({ stack, listing, scaleDisabled }) => {
  return (
    <StackPictureLayout>
      <StackImage src={stack.pictureUrl} alt={stack.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <div className={classes('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <ListingCardStatus listing={listing} />
      </div>
    </StackPictureLayout>
  )
}
