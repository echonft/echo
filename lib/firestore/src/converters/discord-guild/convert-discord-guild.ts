import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreDiscordGuild } from '../../types/model/collections/discord-guild/firestore-discord-guild'
import { FirestoreDiscordGuildData } from '../../types/model/data/discord-guild/firestore-discord-guild-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { refArrayProp } from '../../utils/converter/ref-array-prop'
import { convertContract } from '../contract/convert-contract'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertDiscordGuild: FirestoreConverter<FirestoreDiscordGuild, FirestoreDiscordGuildData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('discordId'),
    propToPromise('channelId'),
    propToPromise('name'),
    refArrayProp('contracts', convertContract)
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreDiscordGuildData>(['refPath', 'id', 'discordId', 'channelId', 'name', 'contracts'])
)
