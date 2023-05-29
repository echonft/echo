import { convertUser } from '../../converters/user/convert-user'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreUserData } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findUserByDiscordId = (discordId: string): Promise<R.Result<FirestoreUserData, Error>> =>
  pipe(
    getCollectionFromPath,
    whereCollection('discordId', '==', discordId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise<FirestoreUserData>('not found'), R.fromPromise<FirestoreUserData>),
        pipe(pipe(head, castAs, convertUser, R.fromPromise<FirestoreUserData>))
      )
    )
  )(CollectionName.USERS)
