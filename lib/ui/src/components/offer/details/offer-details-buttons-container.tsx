/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getOfferModalAcceptButtonTitleForState } from '../../../helpers/get-offer-modal-accept-button-title-for-state'
import { getOfferModalDeclineButtonTitleForState } from '../../../helpers/get-offer-modal-decline-button-title-for-state'
import { isOfferModalAcceptButtonDisplayed } from '../../../helpers/is-offer-modal-accept-button-displayed'
import { isOfferModalDeclineButtonDisplayed } from '../../../helpers/is-offer-modal-decline-button-displayed'
import { HideIf } from '../../base/hide-if'
import { OfferDetailsAcceptButton } from './offer-details-accept-button'
import { OfferDetailsDeclineButton } from './offer-details-decline-button'
import { OfferState } from '@echo/ui-model'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

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
  const t = useTranslations('offer.details')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-8')}>
      <HideIf condition={!isOfferModalAcceptButtonDisplayed(state, isReceiving)}>
        <OfferDetailsAcceptButton onAction={onAccept} disabled={isUpdating}>
          {/* @ts-ignore */}
          {t(getOfferModalAcceptButtonTitleForState(state), { count: nftsCount })}
        </OfferDetailsAcceptButton>
      </HideIf>
      <HideIf condition={!isOfferModalDeclineButtonDisplayed(state)}>
        <OfferDetailsDeclineButton onAction={onDecline} disabled={isUpdating}>
          {/* @ts-ignore */}
          {t(getOfferModalDeclineButtonTitleForState(state, isReceiving))}
        </OfferDetailsDeclineButton>
      </HideIf>
    </div>
  )
}
