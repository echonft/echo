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
export const OfferDetailsCancelButton: FunctionComponent<Props> = () => {
  // export const OfferDetailsCancelButton: FunctionComponent<Props> = ({
  //   offer,
  //   show,
  //   disabled,
  //   onClick,
  //   onSuccess,
  //   onError
  // }) => {
  // const t = useTranslations('offer.details.cancelBtn')
  // const tError = useTranslations('error.offer')
  // const { contractCancelOffer } = useDependencies()
  // const chain = pipe<[OfferWithRole], NonEmptyArray<OwnedNft>, OwnedNft, Chain>(
  //   prop('receiverItems'),
  //   head,
  //   path(['collection', 'contract', 'chain'])
  // )(offer)
  //
  // const { trigger: triggerContractCancel } = useSWRTrigger<HexString, ContractUpdateOfferArgs>({
  //   key: SWRKeys.offer.contractCancel(offer),
  //   fetcher: contractCancelOffer,
  //   onSuccess: (_response) => {
  //     onSuccess?.(
  //       pipe<[OfferWithRole], OfferWithRole, OfferWithRole>(
  //         assoc('state', OfferState.Cancelled),
  //         assoc('locked', true)
  //       )(offer)
  //     )
  //   },
  //   onError: {
  //     alert: { severity: CalloutSeverity.Error, message: tError('cancel') },
  //     onError,
  //     loggerContext: {
  //       component: OfferDetailsCancelButton.name,
  //       fetcher: contractCancelOffer.name,
  //       offer
  //     }
  //   }
  // })
  //
  // if (show) {
  //   return (
  //     <LongPressButton
  //       id={offer.slug}
  //       label={t(disabled ? 'loading' : 'label')}
  //       message={t('message')}
  //       disabled={disabled}
  //       onFinish={() => {
  //         onClick?.()
  //         void triggerContractCancel({ offerId: offer.idContract, chain })
  //       }}
  //     />
  //   )
  // }
  return null
}
