import { FirestoreDocumentSnapshot } from '../../types'
import { FirestoreContract } from '../../types/model/collections/contract/firestore-contract'
import { mockSnapshotDoc } from './mock-snapshot-doc'
import { describe, expect, it } from '@jest/globals'

describe('mockSnapshotDoc', () => {
  it('creating snapshot doc', () => {
    const id = 'contract'
    const contract: FirestoreContract = {
      tokenType: 'ERC721',
      address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
      chainId: 1,
      name: 'BoredApeYachtClub',
      symbol: 'BAYC'
    }
    const snapshot: FirestoreDocumentSnapshot<FirestoreContract> = {
      id: 'contract',
      data: {
        tokenType: 'ERC721',
        address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d',
        chainId: 1,
        name: 'BoredApeYachtClub',
        symbol: 'BAYC'
      }
    }
    expect(mockSnapshotDoc<FirestoreContract>(id, contract)).toEqual(snapshot)
  })
})
