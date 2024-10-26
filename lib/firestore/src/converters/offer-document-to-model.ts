import type { OfferDocument } from '@echo/firestore/types/model/offer-document'
import type { Offer } from '@echo/model/types/offer'
import { dissoc, pipe } from 'ramda'

export function offerDocumentToModel(document: OfferDocument): Offer {
  return pipe(
    dissoc('receiverItemIndexes'),
    dissoc('receiverItemCollections'),
    dissoc('senderItemIndexes'),
    dissoc('senderItemCollections')
  )(document)
}
