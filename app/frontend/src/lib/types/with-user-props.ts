import type { Nullable } from '@echo/utils/types/nullable'
import type { User } from 'next-auth'

export interface WithUserProps {
  user: Nullable<User>
}
