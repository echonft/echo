import type { Offer } from '@echo/model/types/offer'
import { StateExpiration } from '@echo/ui/components/base/state-expiration'
import { OfferDetailsStateLabel } from '@echo/ui/components/offer/details/offer-details-state-label'
import { OfferDetailsStateSeparator } from '@echo/ui/components/offer/details/offer-details-state-separator'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
}

export const OfferDetailsState: FunctionComponent<Props> = ({ offer }) => {
  const { expiresAt, readOnly, state } = offer
  return (
    <div className={clsx('flex', 'flex-row', 'gap-16', 'items-center', 'h-max', 'w-max')}>
      <StateExpiration expiresAt={expiresAt} readOnly={readOnly} state={state} />
      <OfferDetailsStateSeparator readOnly={readOnly} />
      <OfferDetailsStateLabel state={state} />
    </div>
  )
}
