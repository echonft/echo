import { FirestoreBuilder, FirestoreContract, FirestoreContractPrototype } from '../../../../firestore/src'

// TODO Should fetch data from alchemy
export const buildContract: FirestoreBuilder<FirestoreContractPrototype, FirestoreContract> = (prototype) =>
  Promise.resolve({
    address: prototype.address,
    chainId: prototype.chainId,
    tokenType: 'ERC721'
  })
