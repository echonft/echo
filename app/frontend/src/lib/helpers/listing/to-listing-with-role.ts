import { listingDocumentToModel } from '@echo/firestore/converters/listing-document-to-model'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'
import type { User } from '@echo/model/types/user'
import { setListingRoleForUser } from '@echo/ui/helpers/listing/set-listing-role-for-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function toListingWithRole(user: Nullable<User>) {
  return function (listing: ListingDocument) {
    return pipe(listingDocumentToModel, setListingRoleForUser(user))(listing)
  }
}
