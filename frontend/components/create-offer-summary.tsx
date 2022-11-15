import { CreateOfferSummaryDetails } from '@components/create-offer-summary-details'
import { Modal } from '@components/modal'
import { NewOffer, OfferType } from '@echo/model/src/offer'
import React from 'react'
import { useTranslations } from 'use-intl'

interface Props {
  offer: NewOffer
  onAccept?: (offer: NewOffer) => void
}

export const CreateOfferSummary: React.FunctionComponent<Props> = ({ offer, onAccept }) => {
  const t = useTranslations(`CreateOffer.summary.${offer.type === OfferType.BUY ? 'buy' : 'sell'}`)
  return (
    <Modal
      title={t('title')}
      description={'description'}
      onAccept={() => onAccept?.(offer)}
      acceptTitle={t('accept')}
      cancelTitle={t('cancel')}
    >
      <CreateOfferSummaryDetails offer={offer} />
    </Modal>
  )
}
