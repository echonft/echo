import { OfferDetailsAcceptButton } from './offer-details-accept-button'
import { OfferState } from '@echo/ui-model'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsAcceptButtonSwitchProps {
  state: OfferState
  hasApprovedNFTs: boolean
  nftsCount: number
  onAccept?: () => unknown
  onApprove?: () => unknown
  onComplete?: () => unknown
}

export const OfferDetailsAcceptButtonSwitch: FunctionComponent<OfferDetailsAcceptButtonSwitchProps> = ({
  state,
  hasApprovedNFTs,
  nftsCount,
  onAccept,
  onComplete,
  onApprove
}) => {
  const t = useTranslations('offer.details')
  const actionForState = () => {
    switch (state) {
      case 'OPEN':
        return onAccept
      case 'ACCEPTED':
        return hasApprovedNFTs ? onComplete : onApprove
    }
    // Should not happen
    return undefined
  }
  const titleForState = () => {
    switch (state) {
      case 'OPEN':
        return t('acceptBtn')
      case 'ACCEPTED':
        return hasApprovedNFTs ? t('completeBtn') : t('approveBtn', { count: nftsCount })
    }
    // Should not happen
    return ''
  }
  const hasAcceptButton = state === 'OPEN' || state === 'ACCEPTED'
  return hasAcceptButton && <OfferDetailsAcceptButton title={titleForState()} onAction={actionForState()} />
}
