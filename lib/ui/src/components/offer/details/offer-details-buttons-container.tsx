import { OfferDetailsApiButtonsContainer } from '@echo/ui/components/offer/details/offer-details-api-buttons-container'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import { type FunctionComponent } from 'react'

interface Props {
  state: OfferState
  isReceiving: boolean
  nftsCount: number
  isUpdating?: boolean
  onAccept?: () => unknown
  onDecline?: () => unknown
}

export const OfferDetailsButtonsContainer: FunctionComponent<Props> = ({
  state,
  isReceiving,
  nftsCount,
  isUpdating,
  onAccept,
  onDecline
}) => {
  if (state === 'OPEN') {
    return (
      <OfferDetailsApiButtonsContainer
        state={state}
        isReceiving={isReceiving}
        nftsCount={nftsCount}
        isUpdating={isUpdating}
        onDecline={onDecline}
        onAccept={onAccept}
      />
    )
  }

  return null
}
