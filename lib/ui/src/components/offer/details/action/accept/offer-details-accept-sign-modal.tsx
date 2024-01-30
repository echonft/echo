'use client'
import type { AcceptOfferArgs } from '@echo/api/types/fetchers/accept-offer-args'
import type { OfferResponse } from '@echo/api/types/responses/offer-response'
import { offerContext } from '@echo/model/sentry/contexts/offer-context'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import { CALLOUT_SEVERITY_ERROR } from '@echo/ui/constants/callout-severity'
import { SWRKeys } from '@echo/ui/helpers/swr/swr-keys'
import { useSWRTrigger } from '@echo/ui/hooks/use-swr-trigger'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Fetcher } from '@echo/utils/types/fetcher'
import type { HexString } from '@echo/utils/types/hex-string'
import type { SignOfferArgs } from '@echo/web3/types/sign-offer-args'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { assoc } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  chainId: number
  fetcher: {
    acceptOffer: Fetcher<OfferResponse, AcceptOfferArgs>
    signOffer: Fetcher<HexString, SignOfferArgs>
  }
  open: boolean
  onSuccess?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsAcceptSignModal: FunctionComponent<Props> = ({
  offer,
  chainId,
  fetcher,
  open,
  onSuccess,
  onClose
}) => {
  const t = useTranslations('offer.details.acceptModal')
  const tError = useTranslations('error.offer')
  const onError = {
    contexts: offerContext(offer),
    alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('accept') },
    onError: onClose
  }
  const { trigger: signOfferTrigger, isMutating: signOfferMutating } = useSWRTrigger<HexString, SignOfferArgs>({
    key: SWRKeys.offer.sign(offer),
    fetcher: fetcher.signOffer,
    onSuccess: (response) => {
      void acceptOfferTrigger({ offerId: offer.id, signature: response })
    },
    onError
  })
  const { trigger: acceptOfferTrigger, isMutating: acceptOfferMutating } = useSWRTrigger<
    OfferResponse,
    AcceptOfferArgs
  >({
    key: SWRKeys.offer.accept(offer),
    fetcher: fetcher.acceptOffer,
    onSuccess: (response) => {
      onSuccess?.(assoc('role', offer.role, response.offer))
    },
    onError
  })
  const loading = signOfferMutating || acceptOfferMutating

  return (
    <Modal open={open} onClose={loading ? undefined : onClose} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('sign.subtitle')}</ModalSubtitle>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group', loading && 'animate-pulse')}
          onClick={() => {
            void signOfferTrigger({ chainId, offer })
          }}
          disabled={loading}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('sign.btn')}</span>
        </button>
      </div>
    </Modal>
  )
}
