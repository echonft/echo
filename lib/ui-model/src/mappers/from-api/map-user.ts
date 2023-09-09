import { User } from '../../types/user'
import { UserResponse } from '@echo/api'

export function mapUser(user: Partial<UserResponse>) {
  return user as User
}
