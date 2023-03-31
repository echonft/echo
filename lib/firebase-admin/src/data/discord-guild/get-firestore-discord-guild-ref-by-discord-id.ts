import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { FirestoreDiscordGuild } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { DocumentReference } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { always, andThen, head, ifElse, isEmpty, pipe, prop, useWith } from 'ramda'

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
        pipe(
          head,
          prop<DocumentReference<FirestoreDiscordGuild>>('ref'),
          useWith(R.fromExecution, [always<DocumentReference<FirestoreDiscordGuild>>])
        )
      )
    ),
    castAs<Promise<R.Result<DocumentReference<FirestoreDiscordGuild>, Error>>>
  )('guilds')
