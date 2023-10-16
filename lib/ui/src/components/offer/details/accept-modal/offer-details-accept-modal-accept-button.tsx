'use client'
import { acceptOfferFetcher } from '@echo/api/services/fetcher/accept-offer-fetcher'
import { getSignatureConfigForOffer } from '@echo/ui/helpers/contract/get-signature-config-for-offer'
import { Offer } from '@echo/ui/types/model/offer'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent, useCallback, useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import { useSignTypedData } from 'wagmi'

interface Props {
  offer: Offer
  chainId: number
  token: string
  onSuccess?: () => unknown
  onError?: (error: Error) => unknown
}

export const OfferDetailsAcceptModalAcceptButton: FunctionComponent<Props> = ({
  offer,
  chainId,
  token,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.acceptModal')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { data, status, error, signTypedData } = useSignTypedData(getSignatureConfigForOffer(offer, chainId))

  const acceptOffer = useCallback(() => {
    return acceptOfferFetcher(offer.id, data, token)
  }, [offer, data, token])

  const { trigger: acceptOfferTrigger, isMutating } = useSWRMutation(`accept-offer-${offer.id}`, acceptOffer, {
    onSuccess,
    onError
  })

  useEffect(() => {
    if (!isNil(data)) {
      void acceptOfferTrigger()
    }
  }, [data])

  useEffect(() => {
    if (!isNil(error)) {
      onError?.(error)
    }
  }, [error])

  return (
    <button
      className={clsx('btn-gradient', 'btn-size-alt', 'group', 'outline-none')}
      onClick={() => signTypedData()}
      disabled={status === 'loading' || isMutating}
    >
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
    </button>
  )
}
