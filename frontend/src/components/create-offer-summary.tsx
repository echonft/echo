import { CreateOfferSummaryDetails } from '@components/create-offer-summary-details'
import { Modal } from '@components/modal'
import { Collection, NewOffer, OfferItem, OfferType } from '@echo/model'
import { useUser } from '@lib/hooks/use-user'
import { createNewOffer } from '@lib/utils/offer'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  type: OfferType
  collection: Collection
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
  onAccept?: (offer: NewOffer) => void
  onCancel?: VoidFunction
}

export const CreateOfferSummary: FunctionComponent<Props> = ({
  type,
  collection,
  ownerItems,
  counterpartyItems,
  onAccept,
  onCancel
}) => {
  const t = useTranslations(`CreateOffer.summary.${type === OfferType.BUY ? 'buy' : 'sell'}`)
  const userResult = useUser()
  return (
    <Modal
      title={t('title')}
      description={'description'}
      onAccept={() =>
        userResult?.data && onAccept?.(createNewOffer(type, collection, ownerItems, counterpartyItems, userResult.data))
      }
      onCancel={onCancel}
      acceptTitle={t('accept')}
      cancelTitle={t('cancel')}
    >
      <CreateOfferSummaryDetails type={type} counterpartyItems={counterpartyItems} ownerItems={ownerItems} />
    </Modal>
  )
}
