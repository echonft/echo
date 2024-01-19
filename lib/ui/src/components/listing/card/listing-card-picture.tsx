import { getListingItems } from '@echo/model/helpers/listing/get-listing-items'
import type { Listing } from '@echo/model/types/listing'
import type { ListingItem } from '@echo/model/types/listing-item'
import type { Nft } from '@echo/model/types/nft'
import { CardDiscordTag } from '@echo/ui/components/base/card/card-discord-tag'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import { nonEmptyReturn } from '@echo/utils/fp/non-empty-return'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { clsx } from 'clsx'
import { head, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  hideOwner?: boolean
  scaleDisabled?: boolean
}

export const ListingCardPicture: FunctionComponent<Props> = ({ listing, hideOwner, scaleDisabled }) => {
  const nft = pipe<[Listing], NonEmptyArray<ListingItem>, ListingItem, Nft>(
    nonEmptyReturn(getListingItems),
    head,
    nonNullableReturn(prop('nft'))
  )(listing)
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nft.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <div className={clsx('flex', 'flex-row', 'items-center', 'justify-center', 'gap-1.25')}>
          <HideIf condition={Boolean(hideOwner)}>
            <CardDiscordTag username={nft.owner.discord.username} />
          </HideIf>
          <ListingCardStatus listing={listing} />
        </div>
      </div>
    </CardPictureLayout>
  )
}
