import type { Nonce } from '@echo/firestore/types/model/nonce'
import type { NonceDocumentData } from '@echo/firestore/types/model/nonce-document-data'
import { dateNumberIsPast } from '@echo/utils/helpers/date-number-is-past'
import { assoc } from 'ramda'

export function setExpiredProp(data: NonceDocumentData): Nonce {
  return assoc('expired', dateNumberIsPast(data.expiresAt), data)
}
