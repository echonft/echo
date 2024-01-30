'use client'

import type { RejectOfferArgs } from '@echo/api/types/fetchers/reject-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import { useTranslations } from 'next-intl'
import { assoc } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  fetcher: {
    rejectOffer: Fetcher<OfferResponse, RejectOfferArgs>
  }
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsRejectButton: FunctionComponent<Props> = ({
  offer,
  fetcher,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.rejectBtn')
  const tError = useTranslations('error.offer')
  const { trigger } = useSWRTrigger<OfferResponse, RejectOfferArgs>({
    key: SWRKeys.offer.reject(offer),
    fetcher: fetcher.rejectOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
    },
    onError: {
      contexts: offerContext(offer),
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('reject') },
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
