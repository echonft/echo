import { FirestoreDiscordGuild } from '../../types'
import { FirestoreConverter } from '../../types/converter'
import { FirestoreDiscordGuildData } from '../../types/model/data'
import { convertToFirestoreData } from '../../utils/converter/convert-to-firestore-data'
import { propToDataArray } from '../../utils/converter/prop-to-data-array'
import { convertContract } from '../contract/convert-contract'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertDiscordGuild: FirestoreConverter<FirestoreDiscordGuild, FirestoreDiscordGuildData> = pipe(
  convertToFirestoreData,
  juxt([
    propToPromise<string>('id'),
    propToPromise<string>('discordId'),
    propToPromise<string>('channelId'),
    propToPromise<string>('name'),
    propToDataArray('contracts', convertContract)
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreDiscordGuildData>(['id', 'discordId', 'channelId', 'name', 'contracts'])
)
