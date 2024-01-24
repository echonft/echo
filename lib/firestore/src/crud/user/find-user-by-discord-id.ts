import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { pipe } from 'ramda'

export function findUserByDiscordId(discordId: string): Promise<UserDocumentData | undefined> {
  return pipe(getUsersCollectionReference, queryWhere('discord.id', '==', discordId), getQueryUniqueData)()
}
