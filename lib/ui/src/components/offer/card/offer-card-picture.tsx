import type { Nft } from '@echo/model/types/nft'
import type { OfferItem } from '@echo/model/types/offer-item'
import { CardImage } from '@echo/ui/components/base/card/card-image'
import { CardPictureLayout } from '@echo/ui/components/base/card/layout/card-picture-layout'
import { OfferCardStatus } from '@echo/ui/components/offer/card/offer-card-status'
import { getCounterpartyOfferItemsFromRole } from '@echo/ui/helpers/offer/get-counterparty-offer-items-from-role'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyReturn } from '@echo/utils/fp/non-empty-return'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { clsx } from 'clsx'
import { head, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  scaleDisabled?: boolean
}

export const OfferCardPicture: FunctionComponent<Props> = ({ offer, scaleDisabled }) => {
  const nft = pipe<[OfferWithRole], NonEmptyArray<OfferItem>, OfferItem, Nft>(
    nonEmptyReturn(getCounterpartyOfferItemsFromRole),
    head,
    nonNullableReturn(prop('nft'))
  )(offer)
  return (
    <CardPictureLayout>
      <CardImage src={nft.pictureUrl ?? ''} alt={nft.tokenId.toString()} scaleDisabled={scaleDisabled} />
      <div className={clsx('absolute', 'bottom-2', 'left-2', 'h-max', 'w-max')}>
        <OfferCardStatus offer={offer} />
      </div>
    </CardPictureLayout>
  )
}
