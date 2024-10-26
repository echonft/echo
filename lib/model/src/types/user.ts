import type { Username } from '@echo/model/types/username'

export interface User {
  discord: {
    avatarUrl: string
    username: Username
    globalName?: string
  }
  username: Username
}

export type UserIndex = Pick<User, 'username'>
