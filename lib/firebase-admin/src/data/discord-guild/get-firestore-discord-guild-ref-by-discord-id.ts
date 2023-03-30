import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { FirestoreDiscordGuild } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { DocumentReference } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { andThen, call, head, ifElse, invoker, isEmpty, pipe } from 'ramda'

export const getFirestoreDiscordGuildRefByDiscordId = (
  discordId: string
): Promise<R.Result<DocumentReference<FirestoreDiscordGuild>, Error>> =>
  pipe(
    getCollectionFromPath,
    whereCollection<FirestoreDiscordGuild>('discordId', '==', discordId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise('getFirestoreDiscordGuildRefByDiscordId Discord Guild not found'), R.fromPromise),
        pipe(head, invoker(0, 'getRef'), call, R.fromPromise)
      )
    ),
    castAs<Promise<R.Result<DocumentReference<FirestoreDiscordGuild>, Error>>>
  )('guilds')
