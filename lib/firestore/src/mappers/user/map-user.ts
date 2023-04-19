import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreUserData } from '../../types/model/data/user/firestore-user-data'
import { propToMappedDocumentArray } from '../../utils/mapper/prop-to-mapped-document-array'
import { mapDiscordGuild } from '../discord-guild/map-discord-guild'
import { mapWallet } from './map-wallet'
import { User } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapUser: FirestoreMapper<FirestoreUserData, User> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToPromise('discordId'),
      propToPromise('discordUsername'),
      propToPromise('discordAvatar'),
      propToPromise('discordBanner'),
      propToMappedDocumentArray('discordGuilds', mapDiscordGuild),
      propToMappedDocumentArray('wallets', mapWallet)
    ]),
    promiseAll,
    zipPromisesToObject<User>([
      'id',
      'discordId',
      'discordUsername',
      'discordAvatar',
      'discordBanner',
      'discordGuilds',
      'wallets'
    ])
  )
)
