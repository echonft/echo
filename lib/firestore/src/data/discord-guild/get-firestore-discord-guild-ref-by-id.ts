import { CollectionName } from '../../config/collection-name'
import { FirestoreDiscordGuild } from '../../types/model/collections/discord-guild/firestore-discord-guild'
import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreDiscordGuildRefById = (id: string): DocumentReference<FirestoreDiscordGuild> =>
  getDocRefFromPath(CollectionName.GUILDS, id)
