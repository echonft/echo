import { FirestoreUser } from '../../collections/user/firestore-user'
import { FirestoreRootCollectionDocumentData } from '../abstract/firestore-root-collection-document-data'
import { FirestoreDiscordGuildData } from '../discord-guild/firestore-discord-guild-data'
import { FirestoreWalletData } from './firestore-wallet-data'

export interface FirestoreUserData
  extends Omit<FirestoreUser, 'wallets' | 'discordGuilds'>,
    FirestoreRootCollectionDocumentData {
  id: string
  discordGuilds?: FirestoreDiscordGuildData[]
  wallets: FirestoreWalletData[]
}
