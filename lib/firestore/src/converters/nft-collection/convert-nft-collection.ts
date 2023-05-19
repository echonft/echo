import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { refProp } from '../../utils/converter/ref-prop'
import { convertContract } from '../contract/convert-contract'
import { convertDiscordGuild } from '../discord-guild/convert-discord-guild'
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
    'profilePictureUrl',
    'totalSupply',
    'twitterUsername',
    'websiteUrl'
  ])
)
