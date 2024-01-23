'use client'
import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import type { Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ExecuteSwapArgs } from '@echo/web3/types/execute-swap-args'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, isNil, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: Offer
  chainId: number
  signature: HexString | undefined
  fetcher: {
    getOfferSignature: Fetcher<OfferSignatureResponse, GetOfferSignatureArgs>
    executeSwap: Fetcher<HexString, ExecuteSwapArgs>
  }
  open: boolean
  onSuccess?: (offer: Offer) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsSwapExecuteModal: FunctionComponent<Props> = ({
  offer,
  chainId,
  signature,
  fetcher,
  open,
  onSuccess,
  onClose
}) => {
  const t = useTranslations('offer.details.swapModal')
  const tError = useTranslations('error.offer')
  const onError = {
    contexts: offerContext(offer),
    alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('swap') },
    onError: onClose
  }
  const { trigger: executeSwapTrigger, isMutating: executeSwapMutating } = useSWRTrigger<HexString, ExecuteSwapArgs>({
    key: SWRKeys.swap.execute(offer),
    fetcher: fetcher.executeSwap,
    onSuccess: (_response) => {
      onSuccess?.(pipe<[Offer], Offer, Offer>(assoc('state', OFFER_STATE_COMPLETED), assoc('readOnly', true))(offer))
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
  const loading = executeSwapMutating || getOfferSignatureMutating

  return (
    <Modal open={open} onClose={loading ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('execute.subtitle')}</ModalSubtitle>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group')}
          onClick={() => {
            if (isNil(signature)) {
              void getOfferSignatureTrigger({ offerId: offer.id })
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
