import { OfferResponse } from '@echo/api/types/responses/model/offer-response'
import { OfferItemsContainer } from '@echo/ui/components/offer/layout/offer-items-container'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/row/offer-row-swap-icon'
import { SwapRowLayout } from '@echo/ui/components/swap/row/layout/swap-row-layout'
import { AlignmentRight } from '@echo/ui/constants/alignment'
import { Offer } from '@echo/ui/types/model/offer'
import type { FunctionComponent } from 'react'

interface Props {
  offer: Offer | OfferResponse
}

export const SwapRow: FunctionComponent<Props> = ({ offer }) => {
  const { senderItems, receiverItems } = offer
  return (
    <SwapRowLayout>
      <OfferItemsContainer items={senderItems} />
      <OfferRowSwapIcon />
      <OfferItemsContainer items={receiverItems} alignment={AlignmentRight} />
    </SwapRowLayout>
  )
}
