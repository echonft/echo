import { onDocumentCreated } from '@echo/firestore-functions/firestore-triggers/helpers/on-document-created'
import { onOfferCreatedTriggerHandler } from '@echo/firestore-functions/firestore-triggers/trigger-handlers/on-offer-created-trigger-handler'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { OfferDocument } from '@echo/firestore/types/model/offer-document'

export const onOfferCreated = onDocumentCreated<OfferDocument>(CollectionPath.Offers, onOfferCreatedTriggerHandler)
