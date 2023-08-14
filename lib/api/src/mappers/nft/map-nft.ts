import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { propToMappedDocument } from '../base/prop-to-mapped-document'
import { propToMappedDocumentArray } from '../base/prop-to-mapped-document-array'
import { propToUrl } from '../base/prop-to-url'
import { mapNftCollection } from '../nft-collection/map-nft-collection'
import { mapUser } from '../user/map-user'
import { mapNftAttribute } from './map-nft-attribute'
import { FirestoreNftData } from '@echo/firestore'
import { Nft } from '@echo/ui'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { andThen, juxt, omit, pipe } from 'ramda'

export const mapNft: FirestoreMapper<FirestoreNftData, Nft> = andThen(
  pipe(
    omit(['refPath']),
    juxt([
      propToPromise('id'),
      propToMappedDocumentArray('attributes', mapNftAttribute),
      propToPromise('balance'),
      propToMappedDocument('collection', mapNftCollection),
      propToPromise('description'),
      propToPromise('name'),
      propToMappedDocument('owner', mapUser),
      propToUrl('pictureUrl'),
      propToUrl('thumbnailUrl'),
      propToPromise('tokenId'),
      propToPromise('tokenType')
    ]),
    promiseAll,
    zipPromisesToObject<Nft>([
      'id',
      'attributes',
      'balance',
      'collection',
      'description',
      'name',
      'owner',
      'pictureUrl',
      'thumbnailUrl',
      'tokenId',
      'tokenType'
    ])
  )
)
