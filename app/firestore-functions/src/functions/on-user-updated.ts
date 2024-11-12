import { onDocumentUpdated } from '@echo/firestore-functions/firestore-triggers/helpers/on-document-updated'
import { onUserUpdatedTriggerHandler } from '@echo/firestore-functions/firestore-triggers/trigger-handlers/on-user-updated-trigger-handler'
import { CollectionPath } from '@echo/firestore/constants/collection-path'

export const onUserUpdated = onDocumentUpdated(CollectionPath.Users, onUserUpdatedTriggerHandler)
