'use client'
import { offerReceiverNftItems } from '@echo/model/helpers/offer/offer-receiver-nft-items'
import { nftItemToNft } from '@echo/model/mappers/item/nft-item-to-nft'
import { OfferDetailsAcceptModal } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import { OfferDetailsContractApprovalModal } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { useTranslations } from 'next-intl'
import { assoc, pipe } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: VoidFunction
  onError?: VoidFunction
  onSuccess?: (offer: OfferWithRole) => void
}

// TODO ERC20
export const OfferDetailsAcceptModalSwitch: FunctionComponent<Props> = ({
  offer,
  open,
  onClose,
  onError,
  onSuccess
}) => {
  const t = useTranslations('offer.details.acceptModal')
  const [approved, setApproved] = useState(false)
  const receiverNfts = pipe(
    offerReceiverNftItems,
    nonEmptyMap(pipe(nftItemToNft(offer.sender), assoc('attributes', [])))
  )(offer)

  if (approved) {
    return (
      <OfferDetailsAcceptModal offer={offer} open={open} onSuccess={onSuccess} onClose={onClose} onError={onError} />
    )
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
