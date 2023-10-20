'use-client'
import { type EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'
import useSWRMutation from 'swr/mutation'

interface Props {
  offerId: string
  token: string
  rejectOfferFetcher: (offerId: string, token: string | undefined) => Promise<EmptyResponse>
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

export const OfferDetailsRejectButton: FunctionComponent<Props> = ({
  offerId,
  token,
  rejectOfferFetcher,
  disabled,
  onClick,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details')
  const { trigger } = useSWRMutation<EmptyResponse, Error, string, { offerId: string; token: string }>(
    `reject-offer-${offerId}`,
    (_key, { arg: { offerId, token } }) => rejectOfferFetcher(offerId, token),
    {
      onSuccess,
      onError
    }
  )
  return (
    <button
      className={clsx('btn-cancel', 'btn-size-alt', 'group')}
      onClick={() => {
        onClick?.()
        void trigger({ offerId, token })
      }}
      disabled={disabled}
    >
      <span className={clsx('prose-label-lg', 'btn-label-cancel')}>{t('rejectBtn')}</span>
    </button>
  )
}
