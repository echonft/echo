import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import type { User } from '@echo/ui/types/model/user'

export function mapUser(user: Partial<UserResponse>) {
  return user as User
}
