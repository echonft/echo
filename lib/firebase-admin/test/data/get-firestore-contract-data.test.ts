import { getFirestoreContractData } from '../../src/data/contract/get-firestore-contract-data'
import { contractFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('data - contract - getFirestoreContractData', () => {
  it('returns proper contract data on existing object', async () => {
    const contract = await getFirestoreContractData('37dBlwJYahEAKeL0rNP8')
    expect(contract).toStrictEqual(contractFirestoreData['37dBlwJYahEAKeL0rNP8'])
  })
  it('throws if empty path', async () => {
    try {
      await getFirestoreContractData('')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('throws if invalid path', async () => {
    try {
      await getFirestoreContractData('test')
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})
