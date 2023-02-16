import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { mockSnapshotDoc } from '../../utils/tests/mock-snapshot-doc'
import { mapContract } from './map-contract'
import { Contract } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mapContract', () => {
  it('correct mapping', () => {
    const id = 'contract'
    const firestoreContract: FirestoreContract = {
      tokenType: 'ERC721',
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      chainId: 1,
      name: 'BoredApeYachtClub',
      symbol: 'BAYC'
    }
    const contract: Contract = {
      id,
      tokenType: 'ERC721',
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      chainId: 1,
      name: 'BoredApeYachtClub',
      symbol: 'BAYC'
    }
    const snapshot = mockSnapshotDoc<FirestoreContract>(id, firestoreContract)
    return expect(mapContract(snapshot)).resolves.toEqual(contract)
  })
})
