import { AuthUser } from '../../types/auth/auth-user'
import { User } from '@echo/firestore'
import { modifyDatePropToNumber, removeUndefinedProps } from '@echo/utils'
import { dissoc, pipe } from 'ramda'

export function mapUserToAuthUser(user: User): AuthUser {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(removeUndefinedProps, dissoc('nonce'), modifyDatePropToNumber('updatedAt'))(user)
}
