'use client'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { useAlertStore } from '@echo/ui/hooks/use-alert-store'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { getExecuteSwapWriteConfig } from '@echo/web3/helpers/get-execute-swap-write-config'
import { captureException } from '@sentry/nextjs'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent, useCallback, useEffect } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'

interface Props {
  offer: Offer
  chainId: number
  signature: HexString
  onLoading?: EmptyFunction
  onSuccess?: (offer: Offer) => unknown
  onError?: EmptyFunction
}

export const OfferDetailsSwapModalSwapButton: FunctionComponent<Props> = ({
  offer,
  chainId,
  signature,
  onLoading,
  onSuccess,
  onError
}) => {
  const t = useTranslations('offer.details.swapModal')
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
  const writeConfig = getExecuteSwapWriteConfig(chainId, signature, offer)
  const { config } = usePrepareContractWrite(writeConfig)
  const { status, data, write, error } = useContractWrite(config)
  const loading = status === 'loading'

  // TODO Need to refresh offer (DEV-173)
  useEffect(() => {
    if (!isNil(data)) {
      onSuccess?.(offer)
    }
  }, [data, offer, onSuccess])

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
    <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={write} disabled={loading}>
      <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('btn')}</span>
    </button>
  )
}
