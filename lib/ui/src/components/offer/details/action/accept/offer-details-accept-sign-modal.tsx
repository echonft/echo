'use client'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import type { ErrorCallback } from '@echo/ui/helpers/error-callback'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import { useDependencies } from '@echo/ui/providers/dependencies-provider'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onSuccess?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsAcceptSignModal: FunctionComponent<Props> = ({ offer, open, onSuccess, onClose }) => {
  const t = useTranslations('offer.details.acceptModal')
  const tError = useTranslations('error.offer')
  // const { chainId } = useAccount()
  const { acceptOffer } = useDependencies()
  const onError: Omit<ErrorCallback, 'show'> = {
    contexts: offerContext(offer),
    alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('accept') },
    onError: onClose
  }

  const { /*trigger: acceptOfferTrigger,*/ isMutating: acceptOfferMutating } = useSWRTrigger<
    OfferResponse,
    AcceptOfferArgs
  >({
    key: SWRKeys.offer.accept(offer),
    fetcher: acceptOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
    },
    onError
  })
  const loading = acceptOfferMutating

  return (
    <Modal open={open} onClose={loading ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('sign.subtitle')}</ModalSubtitle>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
          onClick={() => {
            // void signOfferTrigger({ chainId: chainId!, offer })
          }}
          disabled={loading}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('sign.btn')}</span>
        </button>
      </div>
    </Modal>
  )
}
