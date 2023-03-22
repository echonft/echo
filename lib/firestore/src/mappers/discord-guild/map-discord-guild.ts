import { FirestoreDiscordGuildData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapContract } from '../contract'
import { DiscordGuild } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapDiscordGuild: FirestoreMapper<FirestoreDiscordGuildData, DiscordGuild> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToPromise('discordId'),
      propToPromise('channelId'),
      propToPromise('name'),
      propToMappedDocumentArray('contracts', mapContract)
    ]),
    promiseAll,
    zipPromisesToObject<DiscordGuild>(['id', 'discordId', 'channelId', 'name', 'contracts'])
  )
)
