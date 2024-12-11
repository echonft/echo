'use client'
import { OfferState } from '@echo/model/constants/offer-state'
import type { HexString } from '@echo/model/types/hex-string'
import type { Offer } from '@echo/model/types/offer'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalDescription } from '@echo/ui/components/base/modal/modal-description'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CalloutSeverity } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/constants/swr-keys'
import { useDependencies } from '@echo/ui/hooks/use-dependencies'
import { useEchoTradingFees } from '@echo/ui/hooks/use-echo-trading-fees'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: VoidFunction
  onError?: VoidFunction
  onSuccess?: (offer: OfferWithRole) => void
}

// TODO ERC20
export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({ offer, open, onClose, onError, onSuccess }) => {
  const t = useTranslations('offer.details.acceptModal')
  const tError = useTranslations('error.offer')
  const { acceptOffer } = useDependencies()
  const fees = useEchoTradingFees()
  const { trigger: triggerContractAccept, isMutating: isContractAcceptMutating } = useSWRTrigger<
    HexString,
    Offer['idContract']
  >({
    key: SWRKeys.offer.contractAccept(offer),
    fetcher: acceptOffer,
    onSuccess: () => {
      onSuccess?.(assoc('state', OfferState.Accepted, offer))
    },
    onError: {
      alert: { severity: CalloutSeverity.Error, message: tError('accept') },
      onError: onError,
      loggerContext: {
        offer
      }
    }
  })
  const isMutating = isContractAcceptMutating || isNil(fees)

  return (
    <Modal open={open} onClose={isMutating ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch', 'p-6')}>
        <ModalSubtitle>{t('accept.subtitle')}</ModalSubtitle>
        {!isNil(fees) && (
          <ModalDescription>{t('accept.description', { fees, count: offer.senderItems.length })}</ModalDescription>
        )}
        <button
          className={clsx('btn-gradient', 'group', isMutating && 'animate-pulse')}
          onClick={() => {
            void triggerContractAccept(offer.idContract)
          }}
          disabled={isMutating}
        >
          <span className={clsx('btn-label-gradient')}>{t('accept.btn')}</span>
        </button>
      </div>
    </Modal>
  )
}
