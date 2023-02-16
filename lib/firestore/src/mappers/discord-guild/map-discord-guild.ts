import { FirestoreDiscordGuild, FirestoreDocumentSnapshot, FirestoreMapper } from '../../types'
import { mapContract } from '../contract'
import { dataDocs, dataPropPromise, idPromise, zipPromisesToObject } from '../mapper-helper'
import { DiscordGuild } from '@echo/model'
import { juxt, pipe } from 'ramda'

export const mapDiscordGuild: FirestoreMapper<FirestoreDiscordGuild, DiscordGuild> = pipe(
  juxt<FirestoreDocumentSnapshot<FirestoreDiscordGuild>[], Promise<DiscordGuild[keyof DiscordGuild]>>([
    idPromise,
    dataPropPromise('discordId'),
    dataDocs('contracts', mapContract),
    dataPropPromise('channelId'),
    dataPropPromise('name')
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject(['id', 'discordId', 'contracts', 'channelId', 'name'])
)
