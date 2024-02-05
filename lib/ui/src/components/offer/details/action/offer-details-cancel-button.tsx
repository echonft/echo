'use client'
import type { CancelOfferArgs } from '@echo/api/types/fetchers/cancel-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { useTranslations } from 'next-intl'
import { assoc } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsCancelButton: FunctionComponent<Props> = ({
  offer,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.cancelBtn')
  const tError = useTranslations('error.offer')
  const { cancelOffer } = useDependencies()
  const { trigger } = useSWRTrigger<OfferResponse, CancelOfferArgs>({
    key: SWRKeys.offer.cancel(offer),
    fetcher: cancelOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
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
