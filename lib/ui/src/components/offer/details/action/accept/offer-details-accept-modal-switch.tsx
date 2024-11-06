'use client'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { OfferDetailsAcceptModal } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import { OfferDetailsContractApprovalModal } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { useTranslations } from 'next-intl'
import { assoc, pipe } from 'ramda'
import { useState, type FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
}

// TODO ERC20
export const OfferDetailsAcceptModalSwitch: FunctionComponent<Props> = ({ offer, open, onClose, onSuccess }) => {
  const t = useTranslations('offer.details.acceptModal')
  const [approved, setApproved] = useState(false)
  // const { status } = useAccount()
  const receiverNfts = pipe(
    offerReceiverNftItems,
    nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', [])))
  )(offer)

  // FIXME
  // if (status !== 'connected') {
  //   return <ConnectWalletModal open={open} onClose={onClose} />
  // }
  if (approved) {
    return <OfferDetailsAcceptModal offer={offer} open={open} onSuccess={onSuccess} onClose={onClose} />
  }

  return (
    <OfferDetailsContractApprovalModal
      items={receiverNfts}
      open={open}
      title={t('title')}
      subtitle={t('approval.subtitle')}
      onSuccess={() => {
        setApproved(true)
      }}
      onClose={onClose}
    />
  )
}
