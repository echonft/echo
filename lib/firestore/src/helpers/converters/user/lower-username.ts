import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { modify, toLower } from 'ramda'

export function lowerUsername<T extends UserDocumentData | WithFieldValue<UserDocumentData>>(user: T): T {
  return modify('username', toLower, user) as T
}
