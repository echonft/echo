'use client'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
}

// TODO ERC20 + ERC1155
export const OfferDetailsAcceptModalSwitch: FunctionComponent<Props> = () => {
  // export const OfferDetailsAcceptModalSwitch: FunctionComponent<Props> = ({ offer, open, onClose, onSuccess }) => {
  // const t = useTranslations('offer.details.acceptModal')
  // const [approved, setApproved] = useState(false)
  // const { status } = useAccount()
  //
  // if (status !== 'connected') {
  //   return <ConnectWalletModal open={open} onClose={onClose} />
  // }
  //
  // if (approved) {
  //   return <OfferDetailsAcceptModal offer={offer} open={open} onSuccess={onSuccess} onClose={onClose} />
  // }
  //
  // return (
  //   <OfferDetailsContractApprovalModal
  //     items={offer.receiverItems}
  //     open={open}
  //     title={t('title')}
  //     subtitle={t('approval.subtitle')}
  //     onSuccess={() => {
  //       setApproved(true)
  //     }}
  //     onClose={onClose}
  //   />
  // )
  return null
}
