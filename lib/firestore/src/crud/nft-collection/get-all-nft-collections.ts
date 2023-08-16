import { CollectionName } from '../../constants/collection-name'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { promiseAll } from '@echo/utils'
import { andThen, map, pipe } from 'ramda'

export const getAllNftCollections = (): Promise<FirestoreNftCollectionData[]> =>
  pipe(
    getCollectionFromPath<FirestoreNftCollection>,
    getCollectionDocs,
    andThen(pipe(map(convertNftCollection), promiseAll))
  )(CollectionName.NFT_COLLECTIONS)
