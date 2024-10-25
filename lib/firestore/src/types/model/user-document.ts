import type { User } from '@echo/model/types/user'

export interface UserDocument extends Omit<User, 'discord'> {
  discord: Omit<User['discord'], 'globalName'> & Partial<Pick<User['discord'], 'globalName'>> & Record<'id', string>
}
