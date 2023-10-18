import { type Offer } from '@echo/model/types/offer'
import { OfferItemsContainer } from '@echo/ui/components/offer/layout/offer-items-container'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/row/offer-row-swap-icon'
import { SwapRowLayout } from '@echo/ui/components/swap/row/layout/swap-row-layout'
import { AlignmentRight } from '@echo/ui/constants/alignment'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
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
