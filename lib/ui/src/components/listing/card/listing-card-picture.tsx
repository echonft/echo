import { nftItems } from '@echo/model/helpers/item/nft-items'
import type { Item, Items } from '@echo/model/types/item'
import type { Listing } from '@echo/model/types/listing'
import type { NftToken } from '@echo/model/types/token'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { ListingCardStatus } from '@echo/ui/components/listing/card/listing-card-status'
import { clsx } from 'clsx'
import { head, type NonEmptyArray, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  listing: Listing
  scaleDisabled?: boolean
}

export const ListingCardPicture: FunctionComponent<Props> = ({ listing, scaleDisabled }) => {
  const token = pipe<[Listing], Items, NonEmptyArray<Item<NftToken>>, Item<NftToken>, NftToken>(
    prop('items'),
    nftItems,
    head,
    prop('token')
  )(listing)
  return (
    <CardPictureLayout>
      <CardImage src={token.pictureUrl} alt={token.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={token.contract.chain} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <ListingCardStatus listing={listing} />
      </div>
    </CardPictureLayout>
  )
}
