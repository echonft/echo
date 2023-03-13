import { findUserByDiscordId } from '@echo/firebase-admin'
import { User } from '@echo/model'
import { R } from '@mobily/ts-belt'

// TODO Could be more generic with request types
export async function getUserWithDiscordId(discordId: string): Promise<User | undefined> {
  const result = await findUserByDiscordId(discordId)
  if (R.isOk(result)) {
    return R.getExn(result)
  }
  return Promise.resolve(undefined)
}
