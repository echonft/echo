'use client'
import type { GetOfferArgs } from '@echo/api/services/fetcher/get-offer'
import type { GetOfferSignatureArgs } from '@echo/api/services/fetcher/get-offer-signature'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/layout/modal/modal-subtitle'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ExecuteSwapArgs } from '@echo/web3/helpers/wagmi/fetcher/execute-swap'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  chainId: number
  signature: HexString | undefined
  fetcher: {
    getOffer: Fetcher<OfferResponse, GetOfferArgs>
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
  }
  token: string
  open: boolean
  onSuccess?: (offer: Offer) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsSwapExecuteModal: FunctionComponent<Props> = ({
  offer,
  chainId,
  signature,
  fetcher,
  token,
  open,
  onSuccess,
  onClose
}) => {
  const t = useTranslations('offer.details.swapModal')
  const tError = useTranslations('error.offer')
  const onError = {
    contexts: offerContext(offer),
    alert: { severity: CalloutSeverity.ERROR, message: tError('swap') },
    onError: onClose
  }
  const { trigger: getOfferTrigger, isMutating: getOfferMutating } = useSWRTrigger<OfferResponse, GetOfferArgs>({
    key: SWRKeys.offer.get(offer),
    fetcher: fetcher.getOffer,
    onSuccess: (response) => {
      onSuccess?.(response.offer)
    },
    onError
  })
  const { trigger: executeSwapTrigger, isMutating: executeSwapMutating } = useSWRTrigger<HexString, ExecuteSwapArgs>({
    key: SWRKeys.swap.execute(offer),
    fetcher: fetcher.executeSwap,
    onSuccess: (_response) => {
      void getOfferTrigger({ offerId: offer.id, token })
    },
    onError
  })
  const { trigger: getOfferSignatureTrigger, isMutating: getOfferSignatureMutating } = useSWRTrigger<
    OfferSignatureResponse,
    GetOfferSignatureArgs
  >({
    key: SWRKeys.offer.getSignature(offer),
    fetcher: fetcher.getOfferSignature,
    onSuccess: (response) => {
      void executeSwapTrigger({ chainId, signature: response.signature, offer })
    },
    onError
  })
  const loading = getOfferMutating || executeSwapMutating || getOfferSignatureMutating

  return (
    <Modal open={open} onClose={onClose} title={t('title')} closeDisabled={loading}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('execute.subtitle')}</ModalSubtitle>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group')}
          onClick={() => {
            if (isNil(signature)) {
              void getOfferSignatureTrigger({ offerId: offer.id, token })
            } else {
              void executeSwapTrigger({ chainId, signature, offer })
            }
          }}
          disabled={loading}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('execute.btn')}</span>
        </button>
      </div>
    </Modal>
  )
}
