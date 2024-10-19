import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { type Listing } from '@echo/model/types/listing/listing'
import type { User } from '@echo/model/types/user/user'
import { pipe } from 'ramda'

interface GetListingsForCreatorAndTargetArgs {
  creator: Pick<User, 'username'>
  target: Listing['target']
}

export function getListingsForCreatorAndTarget(args: GetListingsForCreatorAndTargetArgs): Promise<Listing[]> {
  const { creator, target } = args
  return pipe(
    getListingsCollectionReference,
    queryWhere('creator.username', '==', creator.username),
    queryWhere('locked', '==', false),
    queryWhere('target.quantity', '==', target.quantity),
    queryWhere('target.collection.slug', '==', target.collection.slug),
    getQueryData
  )()
}
