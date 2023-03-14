import { getFirestoreDiscordGuildData } from '../../data/discord-guild/get-firestore-discord-guild-data'
import { mapDiscordGuild } from '@echo/firestore'
import { DiscordGuild } from '@echo/model'
import { R } from '@mobily/ts-belt'
import { pipe } from 'ramda'

export const findDiscordGuildById = (id: string) =>
  pipe(getFirestoreDiscordGuildData, mapDiscordGuild, R.fromPromise<DiscordGuild>)(id)
