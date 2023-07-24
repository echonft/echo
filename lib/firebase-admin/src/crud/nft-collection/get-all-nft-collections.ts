import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { CollectionName, FirestoreNftCollection, FirestoreNftCollectionData } from '@echo/firestore'
import { promiseAll } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, map, pipe } from 'ramda'

export const getAllNftCollections = (): Promise<R.Result<FirestoreNftCollectionData[], Error>> =>
  pipe(
    getCollectionFromPath<FirestoreNftCollection>,
    getCollectionDocs,
    andThen(pipe(map(convertNftCollection), promiseAll<FirestoreNftCollectionData>, R.fromPromise))
  )(CollectionName.NFT_COLLECTIONS)
