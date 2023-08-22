import { ApiError } from '../api-error'
import { User } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertUser = (user: User | undefined) => {
  if (isNil(user)) {
    throw new ApiError(400, 'Invalid user id')
  }
}
