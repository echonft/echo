import { User } from '../../types/user'
import { UserResponse } from '@echo/api'
import { assocUndefinedIfPropNotPresent } from '@echo/utils'
import { pipe } from 'ramda'

export function mapUser(user: UserResponse) {
  return pipe(
    assocUndefinedIfPropNotPresent('discordAvatar'),
    assocUndefinedIfPropNotPresent('discordBanner')
  )(user) as User
}
