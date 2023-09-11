import { User } from '../../types/user'
import type { UserResponse } from '@echo/api/types'

export function mapUser(user: Partial<UserResponse>) {
  return user as User
}
