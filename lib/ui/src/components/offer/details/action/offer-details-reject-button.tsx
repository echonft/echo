'use client'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { errorCallback } from '@echo/ui/helpers/error-callback'
import { useActions } from '@echo/ui/hooks/use-actions'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { useTranslations } from 'next-intl'
import { assoc } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: VoidFunction
  onError?: VoidFunction
  onSuccess?: (offer: OfferWithRole) => void
}

export const OfferDetailsRejectButton: FunctionComponent<Props> = ({
  offer,
  show,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.rejectBtn')
  const tError = useTranslations('error.offer')
  const { rejectOffer } = useActions()

  const onReject = useCallback(
    async (slug: Lowercase<string>) => {
      try {
        const rejectedOffer = await rejectOffer(slug)
        onSuccess?.(assoc('role', offer.role, rejectedOffer))
      } catch (err) {
        errorCallback({
          alert: { severity: CalloutSeverity.Error, message: tError('reject') },
          loggerContext: { offer }
        })(err)
        onError?.()
      }
    },
    [offer, onError, onSuccess, rejectOffer, tError]
  )

  if (show) {
    return (
      <LongPressButton
        id={offer.slug}
        label={t('label')}
        message={t('message')}
        disabled={disabled}
        onFinish={() => {
          onClick?.()
          void onReject(offer.slug)
        }}
      />
    )
  }
  return null
}
