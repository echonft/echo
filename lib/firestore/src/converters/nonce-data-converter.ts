import { type NonceDocumentData } from '@echo/firestore/types/model/nonce-document-data'
import { type Nonce } from '@echo/model/types/nonce'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { QueryDocumentSnapshot, type WithFieldValue } from 'firebase-admin/firestore'
import { assoc, dissoc, invoker, pipe } from 'ramda'

function setExpiredProp(data: NonceDocumentData): Nonce {
  return assoc('expired', dateNumberIsPast(data.expiresAt), data)
}

export const nonceDataConverter = {
  fromFirestore(snapshot: QueryDocumentSnapshot<NonceDocumentData, NonceDocumentData>): Nonce {
    return pipe(invoker(0, 'data'), setExpiredProp)(snapshot)
  },
  toFirestore(modelObject: WithFieldValue<Nonce>): WithFieldValue<Nonce> {
    return dissoc('expired', modelObject) as WithFieldValue<Nonce>
  }
}
