import { FirestoreBuilder } from '../../types/builder/firestore-builder'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { FirestoreContractPrototype } from '../../types/prototypes/contract/firestore-contract-prototype'

export const buildContract: FirestoreBuilder<FirestoreContractPrototype, FirestoreContract> = (prototype) =>
  Promise.resolve({
    address: prototype.address,
    chainId: prototype.chainId,
    tokenType: prototype.tokenType ?? 'ERC721',
    name: prototype.name,
    symbol: prototype.symbol
  })
