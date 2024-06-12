import { getGuild } from '@echo/bot/helpers/get-guild'
import type { Logger } from '@echo/utils/types/logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { Client } from 'discord.js'
import { isNil, omit } from 'ramda'

// FIXME might be needed if we support collection guilds
// noinspection JSUnusedGlobalSymbols
interface IsGuildMemberArgs {
  client: Client
  guildId: string
  userId: string
  logger?: Nullable<Logger>
}

export async function isGuildMember(args: IsGuildMemberArgs) {
  const guild = await getGuild(omit(['userId'], args))
  if (isNil(guild)) {
    return false
  }
  const member = await guild.members.fetch({ user: args.userId })
  return !isNil(member)
}
