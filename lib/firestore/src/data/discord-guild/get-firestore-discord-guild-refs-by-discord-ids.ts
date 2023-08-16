import { FirestoreDiscordGuild } from '../../types/model/collections/discord-guild/firestore-discord-guild'
import { getFirestoreDiscordGuildRefByDiscordId } from './get-firestore-discord-guild-ref-by-discord-id'
import { promiseAll } from '@echo/utils'
import { DocumentReference } from 'firebase-admin/firestore'
import { andThen, isNil, map, pipe, reject } from 'ramda'

/**
 * Fetches all the refs for the guild Ids. Discard all the ids that are not in the database.
 * Returns [] if empty or if no guilds are found
 * @param guildIds The ids of the guild to fetch
 */
export const getFirestoreDiscordGuildRefsByDiscordIds = pipe(
  map(getFirestoreDiscordGuildRefByDiscordId),
  promiseAll,
  andThen(reject(isNil))
) as unknown as (guildIds: string[]) => Promise<DocumentReference<FirestoreDiscordGuild>[]>
