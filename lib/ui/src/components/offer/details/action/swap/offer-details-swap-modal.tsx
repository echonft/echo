'use client'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onSuccess?: (offer: OfferWithRole) => unknown
  onClose?: EmptyFunction
}

// TODO ERC20 + ERC1155
export const OfferDetailsSwapModal: FunctionComponent<Props> = () => {
  // export const OfferDetailsSwapModal: FunctionComponent<Props> = ({ open, offer, onClose, onSuccess }) => {
  // const t = useTranslations('offer.details.swapModal')
  // const tError = useTranslations('error.offer')
  // const { contractExecuteOffer } = useDependencies()
  // const chain = pipe<[OfferWithRole], NonEmptyArray<OwnedNft>, OwnedNft, Chain>(
  //   prop('receiverItems'),
  //   head,
  //   path(['collection', 'contract', 'chain'])
  // )(offer)
  // const fees = useEchoTradingFees(chain)
  // const { trigger, isMutating: isContractExecuteMutating } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
  //   key: SWRKeys.swap.execute(offer),
  //   fetcher: contractExecuteOffer,
  //   onSuccess: (_response) => {
  //     onSuccess?.(
  //       pipe<[OfferWithRole], OfferWithRole, OfferWithRole>(
  //         assoc('state', OfferState.Completed),
  //         assoc('locked', true)
  //       )(offer)
  //     )
  //   },
  //   onError: {
  //     alert: { severity: CalloutSeverity.Error, message: tError('swap') },
  //     onError: () => {
  //       onClose?.()
  //     },
  //     loggerContext: {
  //       component: OfferDetailsSwapModal.name,
  //       fetcher: contractExecuteOffer.name,
  //       offer
  //     }
  //   }
  // })
  //
  // const isMutating = isContractExecuteMutating || isNil(fees)
  //
  // return (
  //   <Modal open={open} onClose={isMutating ? undefined : onClose} title={t('title')}>
  //     <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
  //       <ModalSubtitle>{t('execute.subtitle')}</ModalSubtitle>
  //       {!isNil(fees) && (
  //         <ModalDescription>{t('execute.description', { fees, count: offer.receiverItems.length })}</ModalDescription>
  //       )}
  //       <button
  //         className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
  //         onClick={() => {
  //           void trigger({ offerId: offer.idContract, chain })
  //         }}
  //         disabled={isMutating}
  //       >
  //         <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
  //           {t(isMutating ? 'execute.btn.loading' : 'execute.btn.label')}
  //         </span>
  //       </button>
  //     </div>
  //   </Modal>
  // )
  return null
}
