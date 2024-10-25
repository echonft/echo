import type { Username } from '@echo/model/types/username'
import type { Nullable } from '@echo/utils/types/nullable'

export interface User {
  discord: {
    avatarUrl: string
    username: Username
    globalName: Nullable<string>
  }
  username: Username
}

export type UserIndex = Pick<User, 'username'>
