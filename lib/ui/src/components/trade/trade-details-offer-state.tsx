import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer'
import { TradeDetailsStateDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-state-details-layout'
import { TradeDetailsStateLayout } from '@echo/ui/components/trade/layout/trade-details-state-layout'
import { TradeDetailsPaddedStateLayout } from '@echo/ui/components/trade/layout/trade-details-state-padded-layout'
import { TradeDetailsOfferStateLabel } from '@echo/ui/components/trade/trade-details-offer-state-label'
import { TradeDetailsStateSeparator } from '@echo/ui/components/trade/trade-details-state-separator'
import { TradeStateExpiration } from '@echo/ui/components/trade/trade-state-expiration'
import { Alignment } from '@echo/ui/constants/alignments'
import type { FunctionComponent } from 'react'

interface Props {
  trade: Offer
}

export const TradeDetailsOfferState: FunctionComponent<Props> = ({ trade }) => {
  const { state, locked } = trade
  const expired = state === OfferState.Expired

  if (expired) {
    return (
      <TradeDetailsPaddedStateLayout>
        <TradeStateExpiration trade={trade} />
      </TradeDetailsPaddedStateLayout>
    )
  } else if (locked) {
    return (
      <TradeDetailsPaddedStateLayout>
        <TradeDetailsOfferStateLabel state={state} />
      </TradeDetailsPaddedStateLayout>
    )
  }
  return (
    <TradeDetailsStateLayout>
      <TradeDetailsStateDetailsLayout alignment={Alignment.Right}>
        <TradeStateExpiration trade={trade} />
      </TradeDetailsStateDetailsLayout>
      <TradeDetailsStateSeparator locked={locked} />
      <TradeDetailsStateDetailsLayout alignment={Alignment.Left}>
        <TradeDetailsOfferStateLabel state={state} />
      </TradeDetailsStateDetailsLayout>
    </TradeDetailsStateLayout>
  )
}
