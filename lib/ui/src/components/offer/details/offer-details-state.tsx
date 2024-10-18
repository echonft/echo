import { OfferState } from '@echo/model/constants/offer-state'
import type { Offer } from '@echo/model/types/offer/offer'
import { StateExpiration } from '@echo/ui/components/base/state-expiration'
import { OfferDetailsStateDetailsLayout } from '@echo/ui/components/offer/details/layout/offer-details-state-details-layout'
import { OfferDetailsStateLayout } from '@echo/ui/components/offer/details/layout/offer-details-state-layout'
import { OfferDetailsStateLabel } from '@echo/ui/components/offer/details/offer-details-state-label'
import { OfferDetailsStateSeparator } from '@echo/ui/components/offer/details/offer-details-state-separator'
import { ALIGNMENT_LEFT, ALIGNMENT_RIGHT } from '@echo/ui/constants/alignments'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
}

export const OfferDetailsState: FunctionComponent<Props> = ({ offer }) => {
  const { expiresAt, readOnly, state } = offer
  if (offer.state === OfferState.Expired) {
    return (
      <OfferDetailsStateLayout>
        <StateExpiration expiresAt={expiresAt} readOnly={readOnly} state={state} />
      </OfferDetailsStateLayout>
    )
  }
  return (
    <OfferDetailsStateLayout>
      <OfferDetailsStateDetailsLayout alignment={ALIGNMENT_RIGHT}>
        <StateExpiration expiresAt={expiresAt} readOnly={readOnly} state={state} />
      </OfferDetailsStateDetailsLayout>
      <OfferDetailsStateSeparator readOnly={readOnly} />
      <OfferDetailsStateDetailsLayout alignment={ALIGNMENT_LEFT}>
        <OfferDetailsStateLabel state={state} />
      </OfferDetailsStateDetailsLayout>
    </OfferDetailsStateLayout>
  )
}
