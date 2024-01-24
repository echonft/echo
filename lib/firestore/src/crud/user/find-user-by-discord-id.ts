import { getUsersCollectionReference } from '@echo/firestore/helpers/collection-reference/get-users-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { User } from '@echo/firestore/types/model/user/user'
import { pipe } from 'ramda'

export function findUserByDiscordId(discordId: string) {
  return pipe(getUsersCollectionReference, queryWhere<User>('discord.id', '==', discordId), getQueryUniqueData)()
}
