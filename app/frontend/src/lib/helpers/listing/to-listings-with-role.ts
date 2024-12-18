import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import { toListingWithRole } from '@echo/frontend/lib/helpers/listing/to-listing-with-role'
import type { User } from '@echo/model/types/user'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import { map } from 'ramda'

export function toListingsWithRole(user: Nullable<User>) {
  return function (listings: ListingDocument[]) {
    return promiseAll(map(toListingWithRole(user), listings))
  }
}
