import { FirestoreContractData, FirestoreDiscordGuildData } from '@echo/firestore'

export interface DiscordGuildResponse extends Omit<FirestoreDiscordGuildData, 'refPath' | 'contracts'> {
  contracts: Omit<FirestoreContractData, 'refPath'>[]
}
