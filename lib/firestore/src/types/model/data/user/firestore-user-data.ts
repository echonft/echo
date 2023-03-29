import { FirestoreUser } from '../../collections'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreDiscordGuildData } from '../discord-guild'
import { FirestoreWalletData } from './firestore-wallet-data'

export interface FirestoreUserData
  extends Omit<FirestoreUser, 'wallets' | 'discordGuilds'>,
    FirestoreRootCollectionDocumentData {
  id: string
  discordGuilds?: FirestoreDiscordGuildData[]
  wallets: FirestoreWalletData[]
}
