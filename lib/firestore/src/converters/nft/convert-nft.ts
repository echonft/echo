import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreNft } from '../../types/model/collections/nft/firestore-nft'
import { FirestoreNftData } from '../../types/model/data/nft/firestore-nft-data'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converters/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converters/nested-document-array-prop'
import { refProp } from '../../utils/converters/ref-prop'
import { convertNftCollection } from '../nft-collection/convert-nft-collection'
import { convertUser } from '../user/convert-user'
import { convertNftAttribute } from './convert-nft-attribute'
import { promiseAll, propToPromise, zipPromisesToObject } from '@echo/utils'
import { juxt, pipe } from 'ramda'

export const convertNft: FirestoreConverter<FirestoreNft, FirestoreNftData> = pipe(
  convertRootCollectionDocumentSnapshot,
  juxt([
    propToPromise('refPath'),
    propToPromise('id'),
    nestedDocumentArrayProp('attributes', convertNftAttribute),
    propToPromise('balance'),
    refProp('collection', convertNftCollection),
    propToPromise('description'),
    propToPromise('name'),
    refProp('owner', convertUser),
    propToPromise('pictureUrl'),
    propToPromise('thumbnailUrl'),
    propToPromise('tokenId'),
    propToPromise('tokenType')
  ]),
  promiseAll,
  zipPromisesToObject<FirestoreNftData>([
    'refPath',
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
