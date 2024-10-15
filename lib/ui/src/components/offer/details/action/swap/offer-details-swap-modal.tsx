'use client'
import { OFFER_STATE_COMPLETED } from '@echo/model/constants/offer-states'
import type { OwnedNft } from '@echo/model/types/nft'
import { useDependencies } from '@echo/ui/components/base/dependencies-provider'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalDescription } from '@echo/ui/components/base/modal/modal-description'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useEchoTradingFees } from '@echo/ui/hooks/use-echo-trading-fees'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, head, isNil, type NonEmptyArray, path, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onSuccess?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsSwapModal: FunctionComponent<Props> = ({ open, offer, onClose, onSuccess }) => {
  const t = useTranslations('offer.details.swapModal')
  const tError = useTranslations('error.offer')
  const { contractExecuteOffer } = useDependencies()
  const chain = pipe<[OfferWithRole], NonEmptyArray<OwnedNft>, OwnedNft, ChainName>(
    prop('receiverItems'),
    head,
    nonNullableReturn(path(['collection', 'contract', 'chain']))
  )(offer)
  const fees = useEchoTradingFees(chain)
  const { trigger, isMutating: isContractExecuteMutating } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
    key: SWRKeys.swap.execute(offer),
    fetcher: contractExecuteOffer,
    onSuccess: (_response) => {
      onSuccess?.(
        pipe<[OfferWithRole], OfferWithRole, OfferWithRole>(
          assoc('state', OFFER_STATE_COMPLETED),
          assoc('readOnly', true)
        )(offer)
      )
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('swap') },
      onError: () => {
        onClose?.()
      },
      loggerContext: {
        component: OfferDetailsSwapModal.name,
        fetcher: contractExecuteOffer.name,
        offer
      }
    }
  })

  const isMutating = isContractExecuteMutating || isNil(fees)

  return (
    <Modal open={open} onClose={isMutating ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('execute.subtitle')}</ModalSubtitle>
        {!isNil(fees) && (
          <ModalDescription>{t('execute.description', { fees, count: offer.receiverItems.length })}</ModalDescription>
        )}
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
          onClick={() => {
            void trigger({ offerId: offer.idContract, chain })
          }}
          disabled={isMutating}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
            {t(isMutating ? 'execute.btn.loading' : 'execute.btn.label')}
          </span>
        </button>
      </div>
    </Modal>
  )
}
