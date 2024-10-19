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
export const OfferDetailsAcceptModal: FunctionComponent<Props> = () => {
  // export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({ offer, open, onSuccess, onClose }) => {
  // const t = useTranslations('offer.details.acceptModal')
  // const tError = useTranslations('error.offer')
  // const { contractAcceptOffer } = useDependencies()
  // const chain = pipe<[OfferWithRole], NonEmptyArray<OwnedNft>, OwnedNft, Chain>(
  //   prop('receiverItems'),
  //   head,
  //   path(['collection', 'contract', 'chain'])
  // )(offer)
  // const fees = useEchoTradingFees(chain)
  // const { trigger: triggerContractAccept, isMutating: isContractAcceptMutating } = useSWRTrigger<
  //   HexString,
  //   ContractUpdateOfferArgs
  // >({
  //   key: SWRKeys.offer.contractAccept(offer),
  //   fetcher: contractAcceptOffer,
  //   onSuccess: () => {
  //     onSuccess?.(assoc('state', OfferState.Accepted, offer))
  //   },
  //   onError: {
  //     alert: { severity: CalloutSeverity.Error, message: tError('accept') },
  //     onError: onClose,
  //     loggerContext: {
  //       component: OfferDetailsAcceptModal.name,
  //       fetcher: contractAcceptOffer.name,
  //       offer
  //     }
  //   }
  // })
  //
  // const isMutating = isContractAcceptMutating || isNil(fees)
  //
  // return (
  //   <Modal open={open} onClose={isMutating ? undefined : onClose} title={t('title')}>
  //     <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
  //       <ModalSubtitle>{t('accept.subtitle')}</ModalSubtitle>
  //       {!isNil(fees) && (
  //         <ModalDescription>{t('accept.description', { fees, count: offer.senderItems.length })}</ModalDescription>
  //       )}
  //       <button
  //         className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
  //         onClick={() => {
  //           void triggerContractAccept({ offerId: offer.idContract, chain })
  //         }}
  //         disabled={isMutating}
  //       >
  //         <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
  //           {t(isMutating ? 'accept.btn.loading' : 'accept.btn.label')}
  //         </span>
  //       </button>
  //     </div>
  //   </Modal>
  // )
  return null
}
