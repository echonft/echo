import { OfferDetailsAcceptButtonSwitch } from './offer-details-accept-button-switch'
import { OfferDetailsDeclineButtonSwitch } from './offer-details-decline-button-switch'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsButtonsContainerProps {
  state: OfferState
  hasApprovedNFTs: boolean
  nftsCount: number
  onAccept?: () => unknown
  onDecline?: () => unknown
  onApprove?: () => unknown
  onComplete?: () => unknown
}

export const OfferDetailsButtonsContainer: FunctionComponent<OfferDetailsButtonsContainerProps> = ({
  state,
  hasApprovedNFTs,
  nftsCount,
  onAccept,
  onDecline,
  onApprove,
  onComplete
}) => {
  return (
    <div className={clsx('flex', 'flex-row', 'gap-8')}>
      <OfferDetailsAcceptButtonSwitch
        state={state}
        hasApprovedNFTs={hasApprovedNFTs}
        nftsCount={nftsCount}
        onAccept={onAccept}
        onApprove={onApprove}
        onComplete={onComplete}
      />
      <OfferDetailsDeclineButtonSwitch state={state} onDecline={onDecline} />
    </div>
  )
}
