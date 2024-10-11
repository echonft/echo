import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { OfferDocumentData } from '@echo/firestore/types/model/offer/offer-document-data'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { ONE_DAY } from '@echo/model/constants/expiration'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import { expirationToDateNumber } from '@echo/model/helpers/expiration-to-date-number'
import type { OwnedNft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import type { User } from '@echo/model/types/user'
import { nowMs } from '@echo/utils/helpers/now-ms'
import { head, type NonEmptyArray, pipe, prop, toLower, toString } from 'ramda'

export async function unchecked_addOffer(
  senderItems: NonEmptyArray<OwnedNft>,
  receiverItems: NonEmptyArray<OwnedNft>
): Promise<NewDocument<Offer>> {
  const data: Offer = {
    expiresAt: expirationToDateNumber(ONE_DAY),
    idContract: toLower('0xwhatever'),
    readOnly: false,
    receiver: pipe<[NonEmptyArray<OwnedNft>], OwnedNft, User>(head, prop('owner'))(receiverItems),
    receiverItems,
    sender: pipe<[NonEmptyArray<OwnedNft>], OwnedNft, User>(head, prop('owner'))(senderItems),
    senderItems,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: OFFER_STATE_OPEN
  }
  const id = await setReference<Offer, OfferDocumentData>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  return { id, data }
}
