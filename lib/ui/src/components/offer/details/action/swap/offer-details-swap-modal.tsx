'use client'
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
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import clsx from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: EmptyFunction
  onError?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => void
}

// TODO ERC20
export const OfferDetailsSwapModal: FunctionComponent<Props> = ({ open, offer, onClose, onError, onSuccess }) => {
  const t = useTranslations('offer.details.swapModal')
  const tError = useTranslations('error.offer')
  const { swap } = useDependencies()
  const fees = useEchoTradingFees()
  const { trigger, isMutating: isContractExecuteMutating } = useSWRTrigger<HexString, Offer['idContract']>({
    key: SWRKeys.swap.execute(offer),
    fetcher: swap,
    onSuccess: (_response) => {
      onSuccess?.(offer)
    },
    onError: {
      alert: { severity: CalloutSeverity.Error, message: tError('swap') },
      onError: onError,
      loggerContext: {
        offer
      }
    }
  })
  const isMutating = isContractExecuteMutating || isNil(fees)

  return (
    <Modal open={open} onClose={isMutating ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch', 'p-6')}>
        <ModalSubtitle>{t('execute.subtitle')}</ModalSubtitle>
        {!isNil(fees) && (
          <ModalDescription>{t('execute.description', { fees, count: offer.receiverItems.length })}</ModalDescription>
        )}
        <button
          className={clsx('btn-gradient', 'group', isMutating && 'animate-pulse')}
          onClick={() => {
            void trigger(offer.idContract)
          }}
          disabled={isMutating}
        >
          <span className={clsx('btn-label-gradient')}>{t('execute.btn')}</span>
        </button>
      </div>
    </Modal>
  )
}
