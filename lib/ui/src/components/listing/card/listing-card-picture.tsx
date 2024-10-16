import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { Listing } from '@echo/model/types/listing/listing'
import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Erc721Token } from '@echo/model/types/token/erc721-token'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
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
  const token = pipe<[Listing], Listing['items'], Erc721Item | Erc1155Item, Erc721Token | Erc1155Token>(
    prop('items'),
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
