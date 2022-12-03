import { CreateOfferSummaryDetails } from '@components/create-offer-summary-details'
import { Modal } from '@components/modal'
import { CreateOfferRequest } from '@echo/api/dist/types'
import { Collection, OfferItem, OfferType } from '@echo/model'
import { useUser } from '@lib/hooks/use-user'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

interface Props {
  type: OfferType
  collection: Collection
  ownerItems: OfferItem[]
  counterpartyItems: OfferItem[]
  onAccept?: (request: CreateOfferRequest) => void
  onCancel?: VoidFunction
}

function createRequest(
  type: OfferType,
  collection: Collection,
  ownerItems: OfferItem[],
  counterpartyItems: OfferItem[] | undefined,
  userId: string
): CreateOfferRequest {
  return { type, ownerItems, counterpartyItems, collectionId: collection.discordId, userId }
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
      onAccept={() => {
        if (!isNil(userResult) && !isNil(userResult.data)) {
          onAccept?.(createRequest(type, collection, ownerItems, counterpartyItems, userResult?.data.id))
        }
      }}
      onCancel={onCancel}
      acceptTitle={t('accept')}
      cancelTitle={t('cancel')}
    >
      <CreateOfferSummaryDetails type={type} counterpartyItems={counterpartyItems} ownerItems={ownerItems} />
    </Modal>
  )
}
