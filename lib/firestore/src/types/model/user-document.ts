import type { User } from '@echo/model/types/user'

export interface UserDocument extends Omit<User, 'discord'> {
  discord: User['discord'] & Record<'id', string>
}
