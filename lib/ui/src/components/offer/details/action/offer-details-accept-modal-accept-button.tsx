'use client'
import type { EmptyResponse } from '@echo/api/types/responses/empty-response'
import type { Offer } from '@echo/model/types/offer'
import type { HexString } from '@echo/utils/types/hex-string'
import { getSignatureConfigForOffer } from '@echo/web3/src/helpers/get-signature-config-for-offer'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useEffect } from 'react'
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
  ) => Promise<EmptyResponse>
  onSuccess?: () => unknown
  onError?: (error: Error) => unknown
}

export const OfferDetailsAcceptModalAcceptButton: FunctionComponent<Props> = ({
  offer,
  chainId,
  token,
  acceptOfferFetcher,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, status, error, signTypedData } = useSignTypedData(getSignatureConfigForOffer(offer, chainId))
  const { trigger, isMutating } = useSWRMutation<
    EmptyResponse,
    Error,
    string,
    { offerId: string; token: string; signature: HexString }
  >(
    `accept-offer-${offer.id}`,
    (_key, { arg: { offerId, token, signature } }) => acceptOfferFetcher(offerId, signature, token),
    {
      onSuccess,
      onError
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
      onError?.(error)
    }
  }, [error, onError])

  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
      onClick={() => signTypedData()}
      disabled={loading}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
    </button>
  )
}
