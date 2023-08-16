import { CollectionName } from '../../constants/collection-name'
import { getDocRefFromPath } from '../../helpers/document/get-doc-ref-from-path'
import { FirestoreDiscordGuild } from '../../types/model/collections/discord-guild/firestore-discord-guild'
import { DocumentReference } from 'firebase-admin/firestore'

export const getFirestoreDiscordGuildRefById = (id: string): DocumentReference<FirestoreDiscordGuild> =>
  getDocRefFromPath(CollectionName.GUILDS, id)
