'use client'
import { OfferDetailsSwapModal } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
}

export const OfferDetailsSwapModalSwitch: FunctionComponent<Props> = ({ offer, open, onClose, onSuccess }) => {
  // if (status !== AccountStatus.Connected) {
  //   return <ConnectWalletModal open={open} onClose={onClose} />
  // }
  return <OfferDetailsSwapModal offer={offer} open={open} onSuccess={onSuccess} onClose={onClose} />
}
