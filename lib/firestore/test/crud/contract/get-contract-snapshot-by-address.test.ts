import { getContractSnapshotByAddress } from '../../../src/crud/contract/get-contract-snapshot-by-address'
import { contractFirestoreData } from '../../mocks/contract/contract-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - contract - getContractSnapshotByAddress', () => {
  it('wrong address and chain id returns error', async () => {
    try {
      await getContractSnapshotByAddress({ address: 'test', chainId: 0 })
    } catch (error) {
      expect(error).toMatch('contract not found')
    }
  })
  it('wrong address but right chain id returns error', async () => {
    try {
      await getContractSnapshotByAddress({ address: 'test', chainId: 0 })
    } catch (error) {
      expect(error).toMatch('contract not found')
    }
  })
  it('wrong chain id but right address returns error', async () => {
    try {
      await getContractSnapshotByAddress({ address: 'test', chainId: 0 })
    } catch (error) {
      expect(error).toMatch('contract not found')
    }
  })
  it('right query returns proper contract', async () => {
    const contractSnapshot = await getContractSnapshotByAddress({
      address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
      chainId: 1
    })
    expect(contractSnapshot.ref.path).toEqual(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.refPath)
  })
})
