'use client'
import { OfferDetailsAcceptSignModal } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-sign-modal'
import { OfferDetailsContractApprovalModal } from '@echo/ui/components/offer/details/offer-details-contract-approval-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: OfferWithRole
  open: boolean
  onClose?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
}

export const OfferDetailsAcceptModal: FunctionComponent<Props> = ({ offer, open, onClose, onSuccess }) => {
  const t = useTranslations('offer.details.acceptModal')
  const [approved, setApproved] = useState(false)

  if (approved) {
    return <OfferDetailsAcceptSignModal offer={offer} open={open} onSuccess={onSuccess} onClose={onClose} />
  }

  return (
    <OfferDetailsContractApprovalModal
      items={offer.receiverItems}
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
