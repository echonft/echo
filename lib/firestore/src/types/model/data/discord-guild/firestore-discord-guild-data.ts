import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreDiscordGuildData extends FirestoreRootCollectionDocumentData {
  channelId: string
  discordId: string
  name: string
  contracts: FirestoreContractData[]
}
