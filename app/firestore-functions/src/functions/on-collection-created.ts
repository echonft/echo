import { onDocumentCreated } from '@echo/firestore-functions/firestore-triggers/helpers/on-document-created'
import { onCollectionCreatedTriggerHandler } from '@echo/firestore-functions/firestore-triggers/trigger-handlers/on-collection-created-trigger-handler'
import { CollectionPath } from '@echo/firestore/constants/collection-path'

export const onCollectionCreated = onDocumentCreated(CollectionPath.Collections, onCollectionCreatedTriggerHandler)
