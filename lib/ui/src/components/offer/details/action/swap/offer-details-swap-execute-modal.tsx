'use client'
import type { GetOfferSignatureArgs } from '@echo/api/types/fetchers/get-offer-signature-args'
import type { ValidateOfferArgs } from '@echo/api/types/fetchers/validate-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import type { OfferSignatureResponse } from '@echo/api/types/responses/offer-signature-response'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import type { ErrorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useAccount } from '@echo/ui/hooks/use-account'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import type { ExecuteSwapArgs } from '@echo/web3-dom/types/execute-swap-args'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, isNil, pipe } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  signature: Nullable<HexString>
  signerSignature: Nullable<HexString>
  open: boolean
  onSuccess?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsSwapExecuteModal: FunctionComponent<Props> = ({
  offer,
  signature,
  signerSignature,
  open,
  onSuccess,
  onClose
}) => {
  const t = useTranslations('offer.details.swapModal')
  const tError = useTranslations('error.offer')
  const { chainId } = useAccount()
  const { executeSwap, getOfferSignature, validateOffer } = useDependencies()
  const onError: Omit<ErrorCallback, 'show'> = {
    contexts: offerContext(offer),
    alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('swap') },
    onError: () => {
      void validateOfferTrigger({ offerId: offer.id })
      onClose?.()
    }
  }
  const { trigger: executeSwapTrigger, isMutating: executeSwapMutating } = useSWRTrigger<HexString, ExecuteSwapArgs>({
    key: SWRKeys.swap.execute(offer),
    fetcher: executeSwap,
    onSuccess: (_response) => {
      onSuccess?.(
        pipe<[OfferWithRole], OfferWithRole, OfferWithRole>(
          assoc('state', OFFER_STATE_COMPLETED),
          assoc('readOnly', true)
        )(offer)
      )
    },
    onError
  })
  const { trigger: getOfferSignatureTrigger, isMutating: getOfferSignatureMutating } = useSWRTrigger<
    OfferSignatureResponse,
    GetOfferSignatureArgs
  >({
    key: SWRKeys.offer.getSignature(offer),
    fetcher: getOfferSignature,
    onSuccess: (response) => {
      void executeSwapTrigger({
        chainId: chainId!,
        signature: response.signature,
        signerSignature: response.signerSignature,
        offer
      })
    },
    onError
  })
  const { trigger: validateOfferTrigger } = useSWRTrigger<OfferResponse, ValidateOfferArgs>({
    key: SWRKeys.offer.validate(offer),
    fetcher: validateOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
    }
  })
  const loading = executeSwapMutating || getOfferSignatureMutating

  return (
    <Modal open={open} onClose={loading ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('execute.subtitle')}</ModalSubtitle>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group')}
          onClick={() => {
            if (isNil(signature) || isNil(signerSignature)) {
              void getOfferSignatureTrigger({ offerId: offer.id })
            } else {
              void executeSwapTrigger({ chainId: chainId!, signature, signerSignature, offer })
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
