import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import type { User } from '@echo/ui/types/model/user'

export function mapUserFromResponse(user: UserResponse) {
  return user as User
}
