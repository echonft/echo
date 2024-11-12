import { onDocumentCreated } from '@echo/firestore-functions/firestore-triggers/helpers/on-document-created'
import { onListingCreatedTriggerHandler } from '@echo/firestore-functions/firestore-triggers/trigger-handlers/on-listing-created-trigger-handler'
import { CollectionPath } from '@echo/firestore/constants/collection-path'

export const onListingCreated = onDocumentCreated(CollectionPath.Listings, onListingCreatedTriggerHandler)
