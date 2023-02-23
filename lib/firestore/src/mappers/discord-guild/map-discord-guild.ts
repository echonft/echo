import { FirestoreDiscordGuildData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapContract } from '../contract'
import { DiscordGuild } from '@echo/model'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, pipe } from 'ramda'

export const mapDiscordGuild: FirestoreMapper<FirestoreDiscordGuildData, DiscordGuild> = andThen(
  pipe(
    juxt([
      propToPromise<string>('id'),
      propToPromise<string>('discordId'),
      propToPromise<string>('channelId'),
      propToPromise<string>('name'),
      propToMappedDocumentArray('contracts', mapContract)
    ]),
    (promises) => Promise.all(promises),
    zipPromisesToObject<DiscordGuild>(['id', 'discordId', 'channelId', 'name', 'contracts'])
  )
)
