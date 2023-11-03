'use client'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { getSignatureConfigForOffer } from '@echo/web3/helpers/get-signature-config-for-offer'
import { captureException } from '@sentry/nextjs'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useSignTypedData } from 'wagmi'

interface Props {
  offer: Offer
  chainId: number
  token: string
  acceptOfferFetcher: (
    offerId: string,
    signature: HexString | undefined,
    token: string | undefined
  ) => Promise<OfferResponse>
  onLoading?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsAcceptModalAcceptButton: FunctionComponent<Props> = ({
  offer,
  chainId,
  token,
  acceptOfferFetcher,
  onLoading,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')
  const tError = useTranslations('error.offer')
  const { show } = useAlertStore()
  const onErrorCallback = useCallback(
    (err: Error) => {
      captureException(err, {
        contexts: offerContext(offer)
      })
      show({ severity: CalloutSeverity.ERROR, message: tError('accept') })
      onError?.()
    },
    [offer, onError, show, tError]
  )
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, status, error, signTypedData } = useSignTypedData(getSignatureConfigForOffer(offer, chainId))
  const { trigger, isMutating } = useSWRMutation<
    OfferResponse,
    Error,
    string,
    { offerId: string; token: string; signature: HexString }
  >(
    `accept-offer-${offer.id}`,
    (_key, { arg: { offerId, token, signature } }) => acceptOfferFetcher(offerId, signature, token),
    {
      onSuccess: (response) => {
        onSuccess?.(response.offer)
      },
      onError: onErrorCallback
    }
  )
  const loading = status === 'loading' || isMutating

  useEffect(() => {
    if (!isNil(data)) {
      void trigger({ offerId: offer.id, signature: data, token })
    }
  }, [data, offer, token, trigger])

  useEffect(() => {
    if (!isNil(error)) {
      onErrorCallback(error)
    }
  }, [error, onErrorCallback])

  useEffect(() => {
    if (loading) {
      onLoading?.()
    }
  }, [loading, onLoading])

  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
      onClick={() => signTypedData()}
      disabled={loading}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('btn')}</span>
    </button>
  )
}
