import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { Username } from '@echo/model/types/username'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import { firestore } from 'firebase-admin'
import type { WithFieldValue } from 'firebase-admin/firestore'
import { both, has, modify, toLower, when } from 'ramda'
import FieldValue = firestore.FieldValue

export function lowerUsernameIfExists(user: WithFieldValue<UserDocumentData>) {
  return when<WithFieldValue<UserDocumentData>, WithFieldValue<UserDocumentData>>(
    both(has('username'), propIsNotNil('username')),
    modify<'username', string | FieldValue, Username>('username', toLower),
    user
  )
}
