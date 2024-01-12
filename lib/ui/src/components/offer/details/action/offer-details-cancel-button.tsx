'use client'
import type { CancelOfferArgs } from '@echo/api/services/fetcher/cancel-offer'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  fetcher: {
    cancelOffer: Fetcher<OfferResponse, CancelOfferArgs>
  }
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsCancelButton: FunctionComponent<Props> = ({
  offer,
  fetcher,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.cancelBtn')
  const tError = useTranslations('error.offer')
  const { trigger } = useSWRTrigger<OfferResponse, CancelOfferArgs>({
    key: SWRKeys.offer.cancel(offer),
    fetcher: fetcher.cancelOffer,
    onSuccess: (response) => {
      onSuccess?.(response.offer)
    },
    onError: {
      contexts: offerContext(offer),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('cancel') },
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
        void trigger({ offerId: offer.id })
      }}
    />
  )
}
