import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { ListingDocumentData } from '@echo/firestore/types/model/listing-document-data'
import type { Listing } from '@echo/model/types/listing/listing'

export type ListingChangeHandlerArgs = ChangeHandlerArgs<Listing, ListingDocumentData>
export type ListingChangeHandler = ChangeHandler<Listing, ListingDocumentData>
