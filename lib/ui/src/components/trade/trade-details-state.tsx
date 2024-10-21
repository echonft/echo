import type { ListingState } from '@echo/model/types/listing-state'
import type { OfferState } from '@echo/model/types/offer-state'
import { TradeDetailsStateDetailsLayout } from '@echo/ui/components/trade/layout/trade-details-state-details-layout'
import { TradeDetailsStateLayout } from '@echo/ui/components/trade/layout/trade-details-state-layout'
import { TradeDetailsStateLabel } from '@echo/ui/components/trade/trade-details-state-label'
import { TradeDetailsStateSeparator } from '@echo/ui/components/trade/trade-details-state-separator'
import { TradeStateExpiration } from '@echo/ui/components/trade/trade-state-expiration'
import { Alignment } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

interface Props {
  expiresAt: number
  expired: boolean
  isOffer: boolean
  locked: boolean
  state: OfferState | ListingState
}

export const TradeDetailsState: FunctionComponent<Props> = ({ expiresAt, expired, isOffer, locked, state }) => {
  if (expired) {
    return (
      <TradeDetailsStateLayout>
        <TradeStateExpiration expiresAt={expiresAt} locked={locked} expired={expired} />
      </TradeDetailsStateLayout>
    )
  } else if (locked) {
    return (
      <TradeDetailsStateLayout>
        <TradeDetailsStateLabel state={state} expired={expired} isOffer={isOffer} />
      </TradeDetailsStateLayout>
    )
  }
  return (
    <TradeDetailsStateLayout>
      <TradeDetailsStateDetailsLayout alignment={Alignment.Right}>
        <TradeStateExpiration expiresAt={expiresAt} locked={locked} expired={expired} />
      </TradeDetailsStateDetailsLayout>
      <TradeDetailsStateSeparator locked={locked} />
      <TradeDetailsStateDetailsLayout alignment={Alignment.Left}>
        <TradeDetailsStateLabel state={state} expired={expired} isOffer={isOffer} />
      </TradeDetailsStateDetailsLayout>
    </TradeDetailsStateLayout>
  )
}
