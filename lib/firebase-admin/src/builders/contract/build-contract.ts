import { FirestoreBuilder, FirestoreContract, FirestoreContractPrototype } from '@echo/firestore'

// TODO Should fetch data from alchemy
export const buildContract: FirestoreBuilder<FirestoreContractPrototype, FirestoreContract> = (prototype) =>
  Promise.resolve({
    address: prototype.address,
    chainId: prototype.chainId,
    tokenType: prototype.tokenType ?? 'ERC721',
    name: prototype.name,
    symbol: prototype.symbol
  })
