import type { ListingState } from '@echo/model/types/listing-state'
import type { OfferState } from '@echo/model/types/offer-state'
import { StateLabel } from '@echo/ui/components/base/state-label'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  expired: boolean
  isOffer: boolean
  state: OfferState | ListingState
}

export const TradeDetailsStateLabel: FunctionComponent<Props> = ({ expired, isOffer, state }) => {
  const tOffer = useTranslations('offer.state')
  const tListing = useTranslations('listing.state')
  if (expired) {
    return null
  }
  return <StateLabel subtitle={isOffer ? tOffer(state as OfferState) : tListing(state as ListingState)} />
}
