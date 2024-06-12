import { getGuild } from '@echo/bot/helpers/get-guild'
import type { WithLogger } from '@echo/utils/types/with-logger'
import { Client } from 'discord.js'
import { isNil, omit } from 'ramda'

interface IsGuildMemberArgs extends WithLogger {
  client: Client
  guildId: string
  userId: string
}

// FIXME might be needed if we support collection guilds
// noinspection JSUnusedGlobalSymbols
export async function isGuildMember(args: IsGuildMemberArgs) {
  const guild = await getGuild(omit(['userId'], args))
  if (isNil(guild)) {
    return false
  }
  const member = await guild.members.fetch({ user: args.userId })
  return !isNil(member)
}
