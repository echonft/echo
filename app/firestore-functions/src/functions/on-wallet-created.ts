import { onDocumentCreated } from '@echo/firestore-functions/firestore-triggers/helpers/on-document-created'
import { onWalletCreatedTriggerHandler } from '@echo/firestore-functions/firestore-triggers/trigger-handlers/on-wallet-created-trigger-handler'
import { CollectionPath } from '@echo/firestore/constants/collection-path'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'

export const onWalletCreated = onDocumentCreated<WalletDocument>(CollectionPath.Wallets, onWalletCreatedTriggerHandler)
