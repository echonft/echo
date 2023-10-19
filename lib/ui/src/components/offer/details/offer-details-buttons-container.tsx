import { HideIf } from '@echo/ui/components/base/utils/hide-if'
import { OfferDetailsAcceptButton } from '@echo/ui/components/offer/details/offer-details-accept-button'
import { OfferDetailsDeclineButton } from '@echo/ui/components/offer/details/offer-details-decline-button'
import { getOfferModalAcceptButtonTitleForState } from '@echo/ui/helpers/offer/get-offer-modal-accept-button-title-for-state'
import { getOfferModalDeclineButtonTitleForState } from '@echo/ui/helpers/offer/get-offer-modal-decline-button-title-for-state'
import { isOfferModalAcceptButtonDisplayed } from '@echo/ui/helpers/offer/is-offer-modal-accept-button-displayed'
import { isOfferModalDeclineButtonDisplayed } from '@echo/ui/helpers/offer/is-offer-modal-decline-button-displayed'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  state: OfferState
  isReceiving: boolean
  isUpdating?: boolean
  onAccept?: () => unknown
  onDecline?: () => unknown
}

export const OfferDetailsButtonsContainer: FunctionComponent<Props> = ({
  state,
  isReceiving,
  isUpdating,
  onAccept,
  onDecline
}) => {
  const t = useTranslations('offer.details')

  return (
    <div className={clsx('flex', 'flex-row', 'gap-8')}>
      <HideIf
        condition={!isOfferModalAcceptButtonDisplayed(state, isReceiving)}
        render={() => (
          <OfferDetailsAcceptButton onAction={onAccept} disabled={isUpdating}>
            {t(getOfferModalAcceptButtonTitleForState(state))}
          </OfferDetailsAcceptButton>
        )}
      />
      <HideIf
        condition={!isOfferModalDeclineButtonDisplayed(state)}
        render={() => (
          <OfferDetailsDeclineButton onAction={onDecline} disabled={isUpdating}>
            {t(getOfferModalDeclineButtonTitleForState(state, isReceiving))}
          </OfferDetailsDeclineButton>
        )}
      />
    </div>
  )
}
