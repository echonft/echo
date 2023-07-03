import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreDiscordGuild } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreDiscordGuildRefById = (id: string): DocumentReference<FirestoreDiscordGuild> =>
  getDocRefFromPath(CollectionName.GUILDS, id)
