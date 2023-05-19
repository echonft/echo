import { contractFirestoreData } from '../../../mocks/src/contract/contract-firestore-data'
import { getFirestoreContractData } from '../../src/data/contract/get-firestore-contract-data'
import { describe, expect, it } from '@jest/globals'

describe('data - contract - getFirestoreContractData', () => {
  it('returns proper contract data on existing object', async () => {
    const contract = await getFirestoreContractData('37dBlwJYahEAKeL0rNP8')
    expect(contract).toStrictEqual(contractFirestoreData['37dBlwJYahEAKeL0rNP8'])
  })
  it('throws if invalid path', async () => {
    try {
      await getFirestoreContractData('')
    } catch (e) {
      expect((e as Error).message).toBe(
        'Value for argument "documentPath" is not a valid resource path. Path must be a non-empty string.'
      )
    }
  })
  it('returns nothing if invalid path', async () => {
    try {
      await getFirestoreContractData('test')
    } catch (e) {
      expect((e as Error).message).toBe('Document does not exist. Path: contracts/test ID: test')
    }
  })
})
