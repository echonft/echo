import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { Expiration } from '@echo/model/constants/expiration'
import { OfferState } from '@echo/model/constants/offer-state'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import { type Offer } from '@echo/model/types/offer/offer'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { pipe, toLower, toString } from 'ramda'

export async function unchecked_addOffer({
  receiver,
  receiverItems,
  sender,
  senderItems
}: Pick<Offer, 'receiver' | 'receiverItems' | 'sender' | 'senderItems'>): Promise<NewDocument<Offer>> {
  const data: Offer = {
    expiresAt: expirationToDateNumber(Expiration.OneDay),
    idContract: toLower('0xwhatever'),
    locked: false,
    receiver,
    receiverItems,
    sender,
    senderItems,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: OfferState.Open
  }
  const id = await setReference<Offer, OfferDocumentData>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  return { id, data }
}
