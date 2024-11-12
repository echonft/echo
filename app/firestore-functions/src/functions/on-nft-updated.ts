import { onDocumentUpdated } from '@echo/firestore-functions/firestore-triggers/helpers/on-document-updated'
import { onNftUpdatedTriggerHandler } from '@echo/firestore-functions/firestore-triggers/trigger-handlers/on-nft-updated-trigger-handler'
import { CollectionPath } from '@echo/firestore/constants/collection-path'

export const onNftUpdated = onDocumentUpdated(CollectionPath.Nfts, onNftUpdatedTriggerHandler)
