import { getListingsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-listings-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import { notReadOnlyListingStates } from '@echo/model/constants/listing-state'
import { type Listing } from '@echo/model/types/listing/listing'
import type { User } from '@echo/model/types/user/user'
import { now } from '@echo/utils/helpers/now'
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
    queryWhere('state', 'in', notReadOnlyListingStates),
    queryWhere('expiresAt', '>', now()),
    queryWhere('target.quantity', '==', target.quantity),
    queryWhere('target.collection.slug', '==', target.collection.slug),
    getQueryData
  )()
}
