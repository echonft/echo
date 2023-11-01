'use-client'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  offerId: string
  token: string
  cancelOfferFetcher: (offerId: string, token: string | undefined) => Promise<EmptyResponse>
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsCancelButton: FunctionComponent<Props> = ({
  offerId,
  token,
  cancelOfferFetcher,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.cancelBtn')
  const { trigger } = useSWRMutation<EmptyResponse, Error, string, { offerId: string; token: string }>(
    `cancel-offer-${offerId}`,
    (_key, { arg: { offerId, token } }) => cancelOfferFetcher(offerId, token),
    {
      onSuccess,
      onError
    }
  )
  return (
    <LongPressButton
      id={offerId}
      label={t('label')}
      message={t('message')}
      disabled={disabled}
      onFinish={() => {
        onClick?.()
        void trigger({ offerId, token })
      }}
    />
  )
}
