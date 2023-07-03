import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { convertRootCollectionDocumentSnapshot } from '../../utils/converter/convert-root-collection-document-snapshot'
import { nestedDocumentArrayProp } from '../../utils/converter/nested-document-array-prop'
import { refProp } from '../../utils/converter/ref-prop'
import { convertNftCollection } from '../nft-collection/convert-nft-collection'
import { convertUser } from '../user/convert-user'
import { convertNftAttribute } from './convert-nft-attribute'
import { FirestoreNft, FirestoreNftData } from '@echo/firestore'
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
