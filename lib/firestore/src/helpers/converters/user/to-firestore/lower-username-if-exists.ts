import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { has, modify, toLower } from 'ramda'

export function lowerUsernameIfExists(modelObject: WithFieldValue<UserDocumentData>): WithFieldValue<UserDocumentData> {
  if (has('username', modelObject)) {
    return modify('username', toLower, modelObject) as WithFieldValue<UserDocumentData>
  }
  return modelObject
}
