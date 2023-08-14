import { CollectionName } from '../../config/collection-name'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { errorPromise } from '@echo/utils'
import { always, andThen, call, converge, head, identity, ifElse, isEmpty, partial, pipe, useWith } from 'ramda'

export const getNftCollectionSnapshotBySlug = pipe(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  converge(call, [
    useWith(partial(whereCollection, ['slug', '==']), [identity]),
    always(getCollectionFromPath(CollectionName.NFT_COLLECTIONS))
  ]),
  getCollectionDocs,
  andThen(ifElse(isEmpty, errorPromise('nft collection not found'), head))
) as (slug: string) => Promise<FirestoreSnapshot<FirestoreNftCollection>>
