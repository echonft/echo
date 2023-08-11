import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { propToMappedDocument } from '../../utils/mappers/prop-to-mapped-document'
import { propToUrl } from '../../utils/mappers/prop-to-url'
import { mapContract } from '../contract/map-contract'
import { mapDiscordGuild } from '../discord-guild/map-discord-guild'
import { NftCollection } from '@echo/model'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapNftCollection: FirestoreMapper<FirestoreNftCollectionData, NftCollection> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToUrl('bannerUrl'),
      propToMappedDocument('contract', mapContract),
      propToPromise('description'),
      propToMappedDocument('discordGuild', mapDiscordGuild),
      propToUrl('discordUrl'),
      propToPromise('floorPrice'),
      propToPromise('name'),
      propToPromise('slug'),
      propToUrl('profilePictureUrl'),
      propToPromise('totalSupply'),
      propToPromise('twitterUsername'),
      propToUrl('websiteUrl')
    ]),
    promiseAll,
    zipPromisesToObject<NftCollection>([
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
)
