import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { FirestoreUser, mapUser } from '@echo/firestore'
import { User } from '@echo/model'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findUserByDiscordId = (discordId: string): Promise<R.Result<User, Error>> =>
  pipe(
    getCollectionFromPath,
    whereCollection<FirestoreUser>('discordId', '==', discordId),
    getCollectionDocs,
    ifElse(
      isEmpty,
      pipe(errorPromise<User>('not found'), R.fromPromise<User>),
      pipe(andThen(pipe(head, castAs, convertUser, mapUser, R.fromPromise<User>)))
    )
  )('users')
