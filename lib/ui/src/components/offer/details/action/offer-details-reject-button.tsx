'use-client'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  token: string
  rejectOfferFetcher: (offerId: string, token: string | undefined) => Promise<OfferResponse>
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsRejectButton: FunctionComponent<Props> = ({
  offer,
  token,
  rejectOfferFetcher,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.rejectBtn')
  const tError = useTranslations('error.offer')
  const { trigger } = useSWRTrigger<OfferResponse, { offerId: string; token: string }>({
    key: `reject-offer-${offer.id}`,
    fetcher: ({ offerId, token }) => rejectOfferFetcher(offerId, token),
    onSuccess: (response) => {
      onSuccess?.(response.offer)
    },
    onError: {
      contexts: offerContext(offer),
      alert: { severity: CalloutSeverity.ERROR, message: tError('reject') },
      onError
    }
  })
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
