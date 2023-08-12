import { NftCollection } from '../../../../ui-model'
import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToMappedDocument } from '../base/prop-to-mapped-document'
import { propToUrl } from '../base/prop-to-url'
import { mapContract } from '../contract/map-contract'
import { mapDiscordGuild } from '../discord-guild/map-discord-guild'
import { FirestoreNftCollectionData } from '@echo/firestore'
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
      propToUrl('discordUrl'),
      propToMappedDocument('discordGuild', mapDiscordGuild),
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
      'discordUrl',
      'discordGuild',
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
