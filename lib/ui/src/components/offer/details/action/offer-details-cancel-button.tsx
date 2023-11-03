'use-client'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { captureException } from '@sentry/nextjs'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  offer: Offer
  token: string
  cancelOfferFetcher: (offerId: string, token: string | undefined) => Promise<EmptyResponse>
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: EmptyFunction
}

export const OfferDetailsCancelButton: FunctionComponent<Props> = ({
  offer,
  token,
  cancelOfferFetcher,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.cancelBtn')
  const tError = useTranslations('error.offer')
  const { show } = useAlertStore()
  const { trigger } = useSWRMutation<EmptyResponse, Error, string, { offerId: string; token: string }>(
    `cancel-offer-${offer.id}`,
    (_key, { arg: { offerId, token } }) => cancelOfferFetcher(offerId, token),
    {
      onSuccess,
      onError: (err) => {
        captureException(err, {
          contexts: offerContext(offer)
        })
        show({ severity: CalloutSeverity.ERROR, message: tError('cancel') })
        onError?.()
      }
    }
  )

  return (
    <LongPressButton
      id={offer.id}
      label={t('label')}
      message={t('message')}
      disabled={disabled}
      onFinish={() => {
        onClick?.()
        void trigger({ offerId: offer.id, token })
      }}
    />
  )
}
