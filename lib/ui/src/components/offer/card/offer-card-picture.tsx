import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { CardChainIcon } from '@echo/ui/components/base/card/card-chain-icon'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { OfferCardStatus } from '@echo/ui/components/offer/card/offer-card-status'
import { getCounterpartyOfferItemsFromRole } from '@echo/ui/helpers/offer/get-counterparty-offer-items-from-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { clsx } from 'clsx'
import { head, type NonEmptyArray, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  scaleDisabled?: boolean
}

export const OfferCardPicture: FunctionComponent<Props> = ({ offer, scaleDisabled }) => {
  const nft = pipe<[OfferWithRole], NonEmptyArray<OwnedNft>, OwnedNft>(getCounterpartyOfferItemsFromRole, head)(offer)
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl} alt={nft.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <CardChainIcon chain={nft.collection.contract.chain} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <OfferCardStatus offer={offer} />
      </div>
    </CardPictureLayout>
  )
}
