import { User } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToDate } from '../base/prop-to-date'
import { propToMappedDocumentArray } from '../base/prop-to-mapped-document-array'
import { mapDiscordGuild } from '../discord-guild/map-discord-guild'
import { mapWallet } from './map-wallet'
import { FirestoreUserData } from '@echo/firestore'
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
      propToMappedDocumentArray('wallets', mapWallet),
      propToDate('updatedAt')
    ]),
    promiseAll,
    zipPromisesToObject<User>([
      'id',
      'discordId',
      'discordUsername',
      'discordAvatar',
      'discordBanner',
      'discordGuilds',
      'wallets',
      'updatedAt'
    ])
  )
)
