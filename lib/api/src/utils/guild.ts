import { findDiscordGuildById } from '@echo/firebase-admin'
import { DiscordGuild } from '@echo/model'
import { R } from '@mobily/ts-belt'

// TODO Could be more generic with request types
export async function getGuildById(guildId: string): Promise<DiscordGuild | undefined> {
  const result = await findDiscordGuildById(guildId)
  if (R.isOk(result)) {
    return R.getExn(result)
  }
  return Promise.resolve(undefined)
}
