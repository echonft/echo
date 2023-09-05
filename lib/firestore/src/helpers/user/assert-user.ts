import { Id, User } from '@echo/firestore-types'
import { propIsNil } from '@echo/utils'
import { isNil } from 'ramda'

export function assertUser(user: Partial<User> | undefined): asserts user is NonNullable<Partial<User>> & Id {
  if (isNil(user)) {
    throw Error('user is not defined')
  }
  if (propIsNil('id', user)) {
    throw Error('user does not have an id')
  }
}
