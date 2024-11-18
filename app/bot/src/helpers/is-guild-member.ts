import { getGuild } from '@echo/bot/helpers/get-guild'
import { isNil } from 'ramda'

interface IsGuildMemberArgs {
  readonly guildId: string
  readonly userId: string
}

// might be needed if we support collection guilds
// noinspection JSUnusedGlobalSymbols
export async function isGuildMember({ guildId, userId }: IsGuildMemberArgs) {
  const guild = await getGuild(guildId)
  if (isNil(guild)) {
    return false
  }
  const member = await guild.members.fetch({ user: userId })
  return !isNil(member)
}
