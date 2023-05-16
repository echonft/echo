import { getDocRefFromPath } from '../../utils/document/get-doc-ref-from-path'
import { CollectionName, FirestoreDiscordGuild } from '@echo/firestore'
import { DocumentReference } from '@google-cloud/firestore'

export const getFirestoreUserRefById = (id: string): DocumentReference<FirestoreDiscordGuild> =>
  getDocRefFromPath(CollectionName.USERS, id)
