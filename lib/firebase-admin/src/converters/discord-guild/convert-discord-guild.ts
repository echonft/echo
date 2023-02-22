import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertSnapshot } from '../../utils/converter/convert-snapshot'
import { refArrayProp } from '../../utils/converter/ref-array-prop'
import { convertContract } from '../contract'
import { FirestoreDiscordGuild, FirestoreDiscordGuildData } from '@echo/firestore'
import { propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertDiscordGuild: FirestoreConverter<FirestoreDiscordGuild, FirestoreDiscordGuildData> = pipe(
  convertSnapshot,
  juxt([
    propToPromise<string>('id'),
    propToPromise<string>('discordId'),
    propToPromise<string>('channelId'),
    propToPromise<string>('name'),
    refArrayProp('contracts', convertContract)
  ]),
  (promises) => Promise.all(promises),
  zipPromisesToObject<FirestoreDiscordGuildData>(['id', 'discordId', 'channelId', 'name', 'contracts'])
)
