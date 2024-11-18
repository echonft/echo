import { onDocumentCreated } from '@echo/firestore-functions/firestore-triggers/helpers/on-document-created'
import { onUserCreatedTriggerHandler } from '@echo/firestore-functions/firestore-triggers/trigger-handlers/on-user-created-trigger-handler'
import { CollectionPath } from '@echo/firestore/constants/collection-path'

export const onUserCreated = onDocumentCreated(CollectionPath.Users, onUserCreatedTriggerHandler)
