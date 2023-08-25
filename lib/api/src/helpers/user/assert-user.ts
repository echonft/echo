import { BadRequestError } from '../error/bad-request-error'
import { User } from '@echo/firestore'
import { isNil } from 'ramda'

export const assertUser = (user: User | undefined) => {
  if (isNil(user)) {
    throw new BadRequestError()
  }
}
