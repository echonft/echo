import { getAllUsers } from '@echo/firestore/crud/user/get-all-users'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { updateUserNfts } from '@echo/firestore-functions/helper/update-user-nfts'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { map, path, pipe } from 'ramda'

export async function updateAllUsersNfts() {
  const users = await getAllUsers()
  await pipe(
    map(pipe<[UserDocumentData], string, Promise<void>>(nonNullableReturn(path(['discord', 'id'])), updateUserNfts)),
    promiseAll
  )(users)
}
