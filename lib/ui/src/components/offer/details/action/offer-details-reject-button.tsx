'use client'

import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { WithSlug } from '@echo/model/types/with-slug'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { useTranslations } from 'next-intl'
import { assoc } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
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
  const { rejectOffer } = useDependencies()
  const { trigger } = useSWRTrigger<OfferResponse, WithSlug>({
    key: SWRKeys.offer.reject(offer),
    fetcher: rejectOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('reject') },
      onError,
      loggerContext: {
        component: OfferDetailsRejectButton.name,
        fetcher: rejectOffer.name,
        offer
      }
    }
  })

  if (show) {
    return (
      <LongPressButton
        id={offer.slug}
        label={t(disabled ? 'loading' : 'label')}
        message={t('message')}
        disabled={disabled}
        onFinish={() => {
          onClick?.()
          void trigger({ slug: offer.slug })
        }}
      />
    )
  }
  return null
}
