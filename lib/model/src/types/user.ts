import type { DiscordProfile } from '@echo/model/types/discord-profile'
import { type Wallet } from '@echo/model/types/wallet'
import type { WithUsername } from '@echo/model/types/with-username'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { modify, pick, when } from 'ramda'

export type UserDiscordProfile = Omit<DiscordProfile, 'id' | 'discriminator'>

export interface User extends WithUsername {
  discord: UserDiscordProfile
  wallet: Wallet
}

function serializeUserDiscordProfile(profile: Partial<UserDiscordProfile>): Partial<UserDiscordProfile> {
  return pick(['username'], profile)
}

export function serializeUser<T extends DeepPartial<User>>(user: T): DeepPartial<User> {
  return when<T, T & Record<'discord', Partial<UserDiscordProfile>>, DeepPartial<User>>(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    propIsNotNil('discord'),
    modify<'discord', Partial<UserDiscordProfile>, Partial<UserDiscordProfile>>('discord', serializeUserDiscordProfile)
  )(user)
}
