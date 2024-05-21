'use client'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { ModalSubtitle } from '@echo/ui/components/base/modal/modal-subtitle'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { HexString } from '@echo/utils/types/hex-string'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  signature: HexString
  offerSignature: HexString
  open: boolean
  onSuccess?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

export const OfferDetailsSwapExecuteModal: FunctionComponent<Props> = ({ open }) => {
  const t = useTranslations('offer.details.swapModal')
  // const tError = useTranslations('error.offer')
  // const { chainId } = useAccount()
  // const { validateOffer } = useDependencies()
  // const onError: Omit<ErrorCallback, 'show'> = {
  //   contexts: offerContext(offer),
  //   alert: { severity: CALLOUT_SEVERITY_ERROR, message: tError('swap') },
  //   onError: () => {
  //     void validateOfferTrigger({ offerId: offer.id })
  //     onClose?.()
  //   }
  // }
  // const { trigger: executeSwapTrigger, isMutating: executeSwapMutating } = useSWRTrigger<HexString, ExecuteSwapArgs>({
  //   key: SWRKeys.swap.execute(offer),
  //   fetcher: executeSwap,
  //   onSuccess: (_response) => {
  //     onSuccess?.(
  //       pipe<[OfferWithRole], OfferWithRole, OfferWithRole>(
  //         assoc('state', OFFER_STATE_COMPLETED),
  //         assoc('readOnly', true)
  //       )(offer)
  //     )
  //   },
  //   onError
  // })
  // const { trigger: validateOfferTrigger } = useSWRTrigger<OfferResponse, ValidateOfferArgs>({
  //   key: SWRKeys.offer.validate(offer),
  //   fetcher: validateOffer,
  //   onSuccess: (response) => {
  //     onSuccess?.(assoc('role', offer.role, response.offer))
  //   }
  // })

  return (
    <Modal open={open} onClose={undefined} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <ModalSubtitle>{t('execute.subtitle')}</ModalSubtitle>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group')}
          onClick={() => {
            // void executeSwapTrigger({ chainId: chainId!, signature, offerSignature, offer })
          }}
          disabled={false}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('execute.btn')}</span>
        </button>
      </div>
    </Modal>
  )
}
