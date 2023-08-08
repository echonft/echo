import { CollectionName } from '../../config/collection-name'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { getDocsFromQuery } from '../../utils/query/get-docs-from-query'
import { errorPromise } from '@echo/utils'
import { query, where } from 'firebase/firestore'
import { andThen, head, ifElse, isEmpty, partialRight, pipe } from 'ramda'

export const getNftCollectionSnapshotBySlug = (slug: string): Promise<FirestoreSnapshot<FirestoreNftCollection>> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(
    getCollectionFromPath<FirestoreNftCollection>,
    partialRight(query, [where('slug', '==', slug)]),
    getDocsFromQuery,
    andThen(ifElse(isEmpty, errorPromise('nft-collection not found'), head))
  )(CollectionName.NFT_COLLECTIONS)
