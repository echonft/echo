import { FirestoreContractPrototype, FirestoreNftCollectionPrototype } from '@echo/firestore'

export interface GetContractMetadataResponse
  extends Omit<FirestoreNftCollectionPrototype, 'discordGuildId' | 'contractId'> {
  contract: FirestoreContractPrototype
}
