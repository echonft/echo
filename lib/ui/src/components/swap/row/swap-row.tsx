import { type Offer } from '@echo/model/types/offer'
import { OfferRowSwapIcon } from '@echo/ui/components/offer/card/offer-row-swap-icon'
import { OfferItemsContainer } from '@echo/ui/components/offer/layout/offer-items-container'
import { SwapRowLayout } from '@echo/ui/components/swap/row/layout/swap-row-layout'
import { ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
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
      <OfferItemsContainer items={receiverItems} alignment={ALIGNMENT_RIGHT} />
    </SwapRowLayout>
  )
}
