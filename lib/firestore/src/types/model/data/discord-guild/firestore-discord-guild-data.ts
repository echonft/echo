import { FirestoreDiscordGuild } from '../../collections/discord-guild/firestore-discord-guild'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreDiscordGuildData
  extends Omit<FirestoreDiscordGuild, 'contracts'>,
    FirestoreRootCollectionDocumentData {
  contracts: FirestoreContractData[]
}
