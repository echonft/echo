import { FirestoreDiscordGuild } from '../../collections'
import { FirestoreData } from '../abstract/firestore-data'
import { FirestoreContractData } from '../contract/firestore-contract-data'

export interface FirestoreDiscordGuildData extends Omit<FirestoreDiscordGuild, 'contracts'>, FirestoreData {
  contracts: FirestoreContractData[]
}
