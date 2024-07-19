import { getOffersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-offers-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { NewDocument } from '@echo/firestore/types/new-document'
import { OFFER_STATE_OPEN } from '@echo/model/constants/offer-states'
import type { Nft } from '@echo/model/types/nft'
import { type Offer } from '@echo/model/types/offer'
import { now } from '@echo/utils/helpers/now'
import { nowMs } from '@echo/utils/helpers/now-ms'
import dayjs from 'dayjs'
import { head, type NonEmptyArray, pipe, toLower, toString } from 'ramda'

export async function unchecked_addOffer(senderItems: Nft[], receiverItems: Nft[]): Promise<NewDocument<Offer>> {
  const data: Offer = {
    createdAt: now(),
    expiresAt: dayjs().add(1, 'day').unix(),
    idContract: toLower('0xwhatever'),
    readOnly: false,
    receiver: head(receiverItems as NonEmptyArray<Nft>).owner,
    receiverItems,
    sender: head(senderItems as NonEmptyArray<Nft>).owner,
    senderItems,
    slug: pipe(nowMs, toString, toLower<string>)(),
    state: OFFER_STATE_OPEN,
    updatedAt: now()
  }
  const id = await setReference<Offer>({
    collectionReference: getOffersCollectionReference(),
    data
  })
  return { id, data }
}
