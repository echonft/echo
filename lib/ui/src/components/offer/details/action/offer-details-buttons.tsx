'use client'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  onSuccess?: (offer: OfferWithRole) => unknown
  onError?: EmptyFunction
}

// function showAcceptButton(offer: OfferWithRole) {
//   try {
//     assertOfferStateTransition(offer, OfferState.Accepted)
//     return isOfferRoleReceiver(offer)
//   } catch (_err) {
//     return false
//   }
// }
//
// function showCancelButton(offer: OfferWithRole) {
//   try {
//     assertOfferStateTransition(offer, OfferState.Cancelled)
//     return isOfferRoleSender(offer)
//   } catch (_err) {
//     return false
//   }
// }
//
// function showRejectButton(offer: OfferWithRole) {
//   try {
//     assertOfferStateTransition(offer, OfferState.Rejected)
//     return isOfferRoleReceiver(offer)
//   } catch (_err) {
//     return false
//   }
// }
//
// function showSwapButton(offer: OfferWithRole) {
//   try {
//     assertOfferStateTransition(offer, OfferState.Completed)
//     return isOfferRoleSender(offer)
//   } catch (_err) {
//     return false
//   }
// }
//
// function showRedeemButton(areNftsInEscrow: boolean | undefined) {
//   if (isNil(areNftsInEscrow)) {
//     return false
//   }
//   return areNftsInEscrow
// }
// function shouldShowButtons(offer: OfferWithRole, areNftsInEscrow: boolean | undefined) {
//   // FIXME could be cleaner
//   return (
//     anyPass([showAcceptButton, showCancelButton, showRejectButton, showSwapButton])(offer) ||
//     showRedeemButton(areNftsInEscrow)
//   )
// }

// TODO ERC20 + ERC1155
export const OfferDetailsButtons: FunctionComponent<Props> = () => {
  // export const OfferDetailsButtons: FunctionComponent<Props> = ({ offer, onSuccess }) => {
  // const shouldCheckForEscrow = offer.state === OfferState.Rejected || offer.state === OfferState.Expired
  // const nftsToCheckForEscrow = isOfferRoleReceiver(offer) ? offer.receiverItems : offer.senderItems
  // const areNftsInEscrow = useAreNftsInEscrow(shouldCheckForEscrow ? nftsToCheckForEscrow : undefined)
  // const [buttonsDisabled, setButtonsDisabled] = useState(false)
  // const disable = () => {
  //   setButtonsDisabled(true)
  // }
  // const enable = () => {
  //   setButtonsDisabled(false)
  // }
  // const success = (offer: OfferWithRole) => {
  //   setButtonsDisabled(false)
  //   onSuccess?.(offer)
  // }
  // const error = () => {
  //   setButtonsDisabled(false)
  // }
  //
  // // Don't show anything if no buttons should be shown
  // if (shouldShowButtons(offer, areNftsInEscrow)) {
  //   return (
  //     <OfferDetailsButtonsLayout>
  //       <OfferDetailsAcceptButton
  //         offer={offer}
  //         show={showAcceptButton(offer)}
  //         onClick={disable}
  //         onSuccess={success}
  //         onCancel={enable}
  //         disabled={buttonsDisabled}
  //       />
  //       <OfferDetailsSwapButton
  //         offer={offer}
  //         show={showSwapButton(offer)}
  //         onClick={disable}
  //         onSuccess={success}
  //         onCancel={enable}
  //         disabled={buttonsDisabled}
  //       />
  //       <OfferDetailsRejectButton
  //         offer={offer}
  //         show={showRejectButton(offer)}
  //         onClick={disable}
  //         onSuccess={success}
  //         onError={error}
  //         disabled={buttonsDisabled}
  //       />
  //       <OfferDetailsCancelButton
  //         offer={offer}
  //         show={showCancelButton(offer)}
  //         onClick={disable}
  //         onSuccess={success}
  //         onError={error}
  //         disabled={buttonsDisabled}
  //       />
  //       <OfferDetailsRedeemButton
  //         offer={offer}
  //         show={showRedeemButton(areNftsInEscrow)}
  //         onClick={disable}
  //         onSuccess={success}
  //         onError={error}
  //         disabled={buttonsDisabled}
  //       />
  //     </OfferDetailsButtonsLayout>
  //   )
  // }
  return null
}
