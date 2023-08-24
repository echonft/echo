import { OfferDetailsDeclineButton } from './offer-details-decline-button'
import { OfferState } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

// TODO Validate states
// I believe the button should read Cancel when the offer is accepted vs. Decline?
export interface OfferDetailsAcceptButtonSwitchProps {
  state: OfferState
  onDecline?: () => unknown
}

export const OfferDetailsDeclineButtonSwitch: FunctionComponent<OfferDetailsAcceptButtonSwitchProps> = ({
  state,
  onDecline
}) => {
  const t = useTranslations('offer.details')
  const canDecline = state === 'OPEN' || state === 'ACCEPTED'
  return canDecline && <OfferDetailsDeclineButton title={t('declineBtn')} onAction={onDecline} />
}
