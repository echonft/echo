import { listingDocumentToModel } from '@echo/firestore/converters/listing-document-to-model'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { User } from '@echo/model/types/user'
import { setListingRoleForUser } from '@echo/ui/helpers/listing/set-listing-role-for-user'
import { promiseAll } from '@echo/utils/helpers/promise-all'
import type { Nullable } from '@echo/utils/types/nullable'
import { map, pipe } from 'ramda'

export function toListingsWithRole(user: Nullable<User>) {
  return function (listings: ListingDocument[]) {
    return pipe(map(pipe(listingDocumentToModel, setListingRoleForUser(user))), promiseAll)(listings)
  }
}
