import type { ChangeHandler, ChangeHandlerArgs } from '@echo/firestore/types/change-handler/change-handler'
import type { ListingDocument } from '@echo/firestore/types/model/listing-document'

export type ListingChangeHandlerArgs = ChangeHandlerArgs<ListingDocument>
export type ListingChangeHandler = ChangeHandler<ListingDocument>
