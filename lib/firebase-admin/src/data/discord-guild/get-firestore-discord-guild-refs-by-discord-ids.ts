import { getFirestoreDiscordGuildRefByDiscordId } from './get-firestore-discord-guild-ref-by-discord-id'
import { FirestoreDiscordGuild } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { isNil, reject } from 'ramda'

/**
 * Fetches all the refs for the guild Ids. Discard all the ids that are not in the database.
 * Returns [] if empty or if no guilds are found
 * @param guildIds The ids of the guild to fetch
 */
export function getFirestoreDiscordGuildRefsByDiscordIds(
  guildIds: string[]
): Promise<DocumentReference<FirestoreDiscordGuild>[]> {
  return Promise.all(
    guildIds.map((discordId) => getFirestoreDiscordGuildRefByDiscordId(discordId).then(R.toUndefined))
  ).then(reject(isNil)) as Promise<DocumentReference<FirestoreDiscordGuild>[]>
}
