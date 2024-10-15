import { OfferUpdateKind } from '@echo/firestore/constants/offer-update-kind'
import type { AddOfferStateUpdateArgs } from '@echo/firestore/crud/offer-update/add-offer-state-update'
import { getOfferUpdatesCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offer-updates-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type {
  OfferStateUpdateDocumentData,
  OfferUpdateDocumentData
} from '@echo/firestore/types/model/offer-update/offer-update-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'

export async function unchecked_addOfferStateUpdate(
  args: AddOfferStateUpdateArgs
): Promise<NewDocument<OfferUpdateDocumentData>> {
  const data: OfferUpdateDocumentData = {
    offerId: args.offerId,
    update: { kind: OfferUpdateKind.State, args: args.args }
  }
  const id = await setReference({
    collectionReference: getOfferUpdatesCollectionReference<OfferStateUpdateDocumentData>(),
    data
  })
  return { id, data }
}
