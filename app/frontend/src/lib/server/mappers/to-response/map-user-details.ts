import { UserResponse } from '@echo/api'
import { UserDetails } from '@echo/firestore-types'
import { removeUndefinedProps } from '@echo/utils'

export function mapUserDetails(user: UserDetails): UserResponse {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return removeUndefinedProps(user)
}
