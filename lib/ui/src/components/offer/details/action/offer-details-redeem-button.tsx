'use client'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

// TODO ERC20 + ERC1155
export const OfferDetailsRedeemButton: FunctionComponent<Props> = () => {
  // export const OfferDetailsRedeemButton: FunctionComponent<Props> = ({
  //   offer,
  //   show,
  //   disabled,
  //   onClick,
  //   onSuccess,
  //   onError
  // }) => {
  //   const t = useTranslations('offer.details')
  //   const tError = useTranslations('error.offer')
  //   const { contractCancelOffer, contractRedeemOffer } = useDependencies()
  //   const chain = pipe<[OfferWithRole], NonEmptyArray<OwnedNft>, OwnedNft, Chain>(
  //     prop('receiverItems'),
  //     head,
  //     path(['collection', 'contract', 'chain'])
  //   )(offer)
  //   const count = isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length
  //   const isRedeemable = offer.state === OfferState.Expired || offer.expiresAt < now()
  //   // In the case the offer is rejected (frontend only), user can redeem by cancelling.
  //   // Otherwise we use the redeem contract call
  //   const { trigger: triggerContractCancel } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
  //     key: SWRKeys.offer.contractCancel(offer),
  //     fetcher: contractCancelOffer,
  //     onSuccess: (_response) => {
  //       onSuccess?.(offer)
  //     },
  //     onError: {
  //       alert: {
  //         severity: CalloutSeverity.Error,
  //         message: tError('cancel', {
  //           count
  //         })
  //       },
  //       onError,
  //       loggerContext: {
  //         component: OfferDetailsRedeemButton.name,
  //         fetcher: contractCancelOffer.name,
  //         offer
  //       }
  //     }
  //   })
  //   const { trigger: triggerContractRedeem } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
  //     key: SWRKeys.offer.contractRedeem(offer),
  //     fetcher: contractRedeemOffer,
  //     onSuccess: (_response) => {
  //       onSuccess?.(offer)
  //     },
  //     onError: {
  //       alert: {
  //         severity: CalloutSeverity.Error,
  //         message: tError('cancel', {
  //           count
  //         })
  //       },
  //       onError,
  //       loggerContext: {
  //         component: OfferDetailsRedeemButton.name,
  //         fetcher: contractRedeemOffer.name,
  //         offer
  //       }
  //     }
  //   })
  //   if (show) {
  //     return (
  //       <button
  //         className={clsx('btn-gradient', 'btn-size', 'group', disabled && 'animate-pulse')}
  //         disabled={disabled}
  //         onClick={() => {
  //           if (isRedeemable) {
  //             void triggerContractRedeem({ offerId: offer.idContract, chain })
  //           } else {
  //             void triggerContractCancel({ offerId: offer.idContract, chain })
  //           }
  //           onClick?.()
  //         }}
  //       >
  //         <span className={clsx('prose-label-lg', 'btn-label-gradient')}>
  //           {t(disabled ? 'redeemBtn.loading' : 'redeemBtn.label', { count })}
  //         </span>
  //       </button>
  //     )
  //   }
  return null
}
