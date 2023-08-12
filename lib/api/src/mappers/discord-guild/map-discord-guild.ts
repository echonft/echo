import { DiscordGuild } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToMappedDocumentArray } from '../base/prop-to-mapped-document-array'
import { mapContract } from '../contract/map-contract'
import { FirestoreDiscordGuildData } from '@echo/firestore'
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
