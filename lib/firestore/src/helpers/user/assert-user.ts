import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

export function assertUser(
  user: Partial<FirestoreUser> | undefined
): asserts user is NonNullable<Partial<FirestoreUser>> {
  if (isNil(user)) {
    throw Error('user is not defined')
  }
  if (propIsNil('id', user)) {
    throw Error('user does not have an id')
  }
}
