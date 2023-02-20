import { FirestoreDiscordGuild, FirestoreDiscordGuildData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToArray } from '../../utils/mapper/prop-to-array'
import { mapContract } from '../contract'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapDiscordGuild: FirestoreMapper<FirestoreDiscordGuildData, FirestoreDiscordGuild> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToPromise<string>('discordId'),
      propToPromise<string>('channelId'),
      propToPromise<string>('name'),
      propToArray('contracts', mapContract)
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<FirestoreDiscordGuild>(['id', 'discordId', 'channelId', 'name', 'contracts'])
  )
)
