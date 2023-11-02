'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Offer } from '@echo/model/types/offer'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { ErrorFunction } from '@echo/utils/types/error-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { getExecuteSwapWriteConfig } from '@echo/web3/helpers/get-execute-swap-write-config'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

interface Props {
  offer: Offer
  chainId: number
  signature: HexString
  token: string
  completeOfferFetcher: (
    offerId: string,
    transactionId: HexString | undefined,
    token: string | undefined
  ) => Promise<EmptyResponse>
  onLoading?: EmptyFunction
  onSuccess?: EmptyFunction
  onError?: ErrorFunction
}

// TODO see how we complete the offer in the backend
export const OfferDetailsSwapModalSwapButton: FunctionComponent<Props> = ({
  offer,
  chainId,
  signature,
  token,
  completeOfferFetcher,
  onLoading,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.swapModal')
  const writeConfig = getExecuteSwapWriteConfig(chainId, signature, offer)
  const { config } = usePrepareContractWrite(writeConfig)
  const { status, write, data, error } = useContractWrite(config)
  const { trigger, isMutating } = useSWRMutation<
    EmptyResponse,
    Error,
    string,
    { offerId: string; token: string; transactionId: HexString }
  >(
    `complete-offer-${offer.id}`,
    (_key, { arg: { offerId, token, transactionId } }) => completeOfferFetcher(offerId, transactionId, token),
    {
      onSuccess,
      onError
    }
  )
  const loading = status === 'loading' || isMutating

  useEffect(() => {
    if (!isNil(data)) {
      void trigger({ offerId: offer.id, transactionId: data.hash, token })
    }
  }, [data, offer, token, trigger])

  useEffect(() => {
    if (!isNil(error)) {
      onError?.(error)
    }
  }, [error, onError])

  useEffect(() => {
    if (loading) {
      onLoading?.()
    }
  }, [loading, onLoading])

  return (
    <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={write} disabled={loading}>
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
    </button>
  )
}
