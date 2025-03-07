'use client'
import type { Expiration } from '@echo/model/constants/expiration'
import type { OwnedNft } from '@echo/model/types/nft'
import type { Offer } from '@echo/model/types/offer'
import { CreateOfferModal } from '@echo/ui/components/offer/create/create-offer-modal'
import { OfferDetailsContractApprovalModal } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import { useTranslations } from 'next-intl'
import type { NonEmptyArray } from 'ramda'
import { type FunctionComponent, useState } from 'react'

interface Props {
  expiration: Expiration
  open: boolean
  senderItems: NonEmptyArray<OwnedNft>
  receiverItems: NonEmptyArray<OwnedNft>
  onClose?: VoidFunction
  onSuccess?: (offer: Offer) => void
}

export const CreateOfferModalSwitch: FunctionComponent<Props> = ({
  senderItems,
  receiverItems,
  expiration,
  open,
  onClose,
  onSuccess
}) => {
  const t = useTranslations('offer.create.modal')
  const [approved, setApproved] = useState(false)

  if (approved) {
    return (
      <CreateOfferModal
        senderItems={senderItems}
        receiverItems={receiverItems}
        open={open}
        expiration={expiration}
        onClose={onClose}
        onSuccess={onSuccess}
      />
    )
  }

  return (
    <OfferDetailsContractApprovalModal
      items={senderItems}
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
