import { getFirestoreDiscordGuildData } from '../../data/discord-guild/get-firestore-discord-guild-data'
import { FirestoreDiscordGuildData } from '@echo/firestore'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findDiscordGuildById = (id: string) =>
  pipe(getFirestoreDiscordGuildData, R.fromPromise<FirestoreDiscordGuildData>)(id)
