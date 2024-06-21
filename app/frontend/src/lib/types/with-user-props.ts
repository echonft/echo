import type { User } from '@echo/auth/types/user'
import type { Nullable } from '@echo/utils/types/nullable'

export interface WithUserProps {
  user: Nullable<User>
}
