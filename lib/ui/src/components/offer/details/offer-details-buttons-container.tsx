/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getOfferModalAcceptButtonTitleForState } from '../../../helpers/get-offer-modal-accept-button-title-for-state'
import { getOfferModalDeclineButtonTitleForState } from '../../../helpers/get-offer-modal-decline-button-title-for-state'
import { isOfferModalAcceptButtonDisplayed } from '../../../helpers/is-offer-modal-accept-button-displayed'
import { isOfferModalDeclineButtonDisplayed } from '../../../helpers/is-offer-modal-decline-button-displayed'
import { HideIfNil } from '../../utils/hide-if-nil'
import { OfferDetailsAcceptButton } from './offer-details-accept-button'
import { OfferDetailsDeclineButton } from './offer-details-decline-button'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsButtonsContainerProps {
  state: OfferState
  nftsCount: number
  onAccept?: () => unknown
  onDecline?: () => unknown
}

export const OfferDetailsButtonsContainer: FunctionComponent<OfferDetailsButtonsContainerProps> = ({
  state,
  nftsCount,
  onAccept,
  onDecline
}) => {
  const t = useTranslations('offer.details')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-8')}>
      <HideIfNil checks={isOfferModalAcceptButtonDisplayed(state)}>
        <OfferDetailsAcceptButton onAction={onAccept}>
          {/* @ts-ignore */}
          {t(getOfferModalAcceptButtonTitleForState(state), { count: nftsCount })}
        </OfferDetailsAcceptButton>
      </HideIfNil>
      <HideIfNil checks={isOfferModalDeclineButtonDisplayed(state)}>
        <OfferDetailsDeclineButton onAction={onDecline}>
          {/* @ts-ignore */}
          {t(getOfferModalDeclineButtonTitleForState(state))}
        </OfferDetailsDeclineButton>
      </HideIfNil>
    </div>
  )
}
