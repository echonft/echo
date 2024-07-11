'use client'
import { OFFER_STATE_ACCEPTED } from '@echo/model/constants/offer-states'
import type { Nft } from '@echo/model/types/nft'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalDescription } from '@echo/ui/components/base/modal/modal-description'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useEchoTradingFees } from '@echo/ui/hooks/use-echo-trading-fees'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import type { ContractUpdateOfferArgs } from '@echo/web3-dom/types/contract-update-offer-args'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, head, isNil, path, pipe, prop } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onSuccess?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({ offer, open, onSuccess, onClose }) => {
  const t = useTranslations('offer.details.acceptModal')
  const tError = useTranslations('error.offer')
  const { contractAcceptOffer } = useDependencies()
  const chain = pipe<[OfferWithRole], Nft[], Nft, ChainName>(
    prop('receiverItems'),
    head,
    nonNullableReturn(path(['collection', 'contract', 'chain']))
  )(offer)
  const fees = useEchoTradingFees(chain)
  const { trigger: triggerContractAccept, isMutating: isContractAcceptMutating } = useSWRTrigger<
    HexString,
    ContractUpdateOfferArgs
  >({
    key: SWRKeys.offer.contractAccept(offer),
    fetcher: contractAcceptOffer,
    onSuccess: () => {
      onSuccess?.(assoc('state', OFFER_STATE_ACCEPTED, offer))
    },
    onError: {
      alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('accept') },
      onError: onClose,
      loggerContext: {
        component: OfferDetailsAcceptModal.name,
        fetcher: contractAcceptOffer.name,
        offer
      }
    }
  })

  const isMutating = isContractAcceptMutating || isNil(fees)

  return (
    <Modal open={open} onClose={isMutating ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('accept.subtitle')}</ModalSubtitle>
        {!isNil(fees) && (
          <ModalDescription>{t('accept.description', { fees, count: offer.senderItems.length })}</ModalDescription>
        )}
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
          onClick={() => {
            void triggerContractAccept({ offerId: offer.idContract, chain })
          }}
          disabled={isMutating}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
            {t(isMutating ? 'accept.btn.loading' : 'accept.btn.label')}
          </span>
        </button>
      </div>
    </Modal>
  )
}
