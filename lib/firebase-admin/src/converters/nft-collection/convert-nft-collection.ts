import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
import { FirestoreNftCollection, FirestoreNftCollectionData } from '@echo/firestore'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertNftCollection: FirestoreConverter<FirestoreNftCollection, FirestoreNftCollectionData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    propToPromise('bannerUrl'),
    refProp('contract', convertContract),
    propToPromise('description'),
    refProp('discordGuild', convertDiscordGuild),
    propToPromise('discordUrl'),
    propToPromise('floorPrice'),
    propToPromise('name'),
    propToPromise('slug'),
    propToPromise('profilePictureUrl'),
    propToPromise('totalSupply'),
    propToPromise('twitterUsername'),
    propToPromise('websiteUrl')
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreNftCollectionData>([
    'refPath',
    'id',
    'bannerUrl',
    'contract',
    'description',
    'discordGuild',
    'discordUrl',
    'floorPrice',
    'name',
    'slug',
    'profilePictureUrl',
    'totalSupply',
    'twitterUsername',
    'websiteUrl'
  ])
)
