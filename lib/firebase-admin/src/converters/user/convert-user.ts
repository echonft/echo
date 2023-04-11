import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { refArrayProp } from '../../utils/converter/ref-array-prop'
import { convertDiscordGuild } from '../discord-guild'
import { convertWallet } from './convert-wallet'
import { FirestoreUser, FirestoreUserData } from '@echo/firestore'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertUser: FirestoreConverter<FirestoreUser, FirestoreUserData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('discordId'),
    propToPromise('discordUsername'),
    propToPromise('discordAvatar'),
    propToPromise('discordBanner'),
    refArrayProp('discordGuilds', convertDiscordGuild),
    nestedDocumentArrayProp('wallets', convertWallet)
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreUserData>([
    'refPath',
    'id',
    'discordId',
    'discordUsername',
    'discordAvatar',
    'discordBanner',
    'discordGuilds',
    'wallets'
  ])
)
