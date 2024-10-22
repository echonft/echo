import { ListingState } from '@echo/model/constants/listing-state'
import type { Listing } from '@echo/model/types/listing/listing'
import { TradeDetailsStateDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-state-details-layout'
import { TradeDetailsStateLayout } from '@echo/ui/components/trade/layout/trade-details-state-layout'
import { TradeDetailsListingStateLabel } from '@echo/ui/components/trade/trade-details-listing-state-label'
import { TradeDetailsStateSeparator } from '@echo/ui/components/trade/trade-details-state-separator'
import { TradeStateExpiration } from '@echo/ui/components/trade/trade-state-expiration'
import { Alignment } from '@echo/ui/constants/alignments'
import type { FunctionComponent } from 'react'

interface Props {
  trade: Listing
}

export const TradeDetailsListingState: FunctionComponent<Props> = ({ trade }) => {
  const { state, locked } = trade
  const expired = state === ListingState.Expired

  if (expired) {
    return (
      <TradeDetailsStateLayout>
        <TradeStateExpiration trade={trade} />
      </TradeDetailsStateLayout>
    )
  } else if (locked) {
    return (
      <TradeDetailsStateLayout>
        <TradeDetailsListingStateLabel state={state} />
      </TradeDetailsStateLayout>
    )
  }
  return (
    <TradeDetailsStateLayout>
      <TradeDetailsStateDetailsLayout alignment={Alignment.Right}>
        <TradeStateExpiration trade={trade} />
      </TradeDetailsStateDetailsLayout>
      <TradeDetailsStateSeparator locked={locked} />
      <TradeDetailsStateDetailsLayout alignment={Alignment.Left}>
        <TradeDetailsListingStateLabel state={state} />
      </TradeDetailsStateDetailsLayout>
    </TradeDetailsStateLayout>
  )
}
