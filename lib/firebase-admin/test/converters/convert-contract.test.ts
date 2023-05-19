import { contractFirestoreData } from '../../../mocks/src/contract/contract-firestore-data'
import { getFirestoreContractData } from '../../src/data/contract/get-firestore-contract-data'
import { describe, expect, it } from '@jest/globals'

describe('convertContract', () => {
  it('correct conversion', async () => {
    const contract = await getFirestoreContractData('37dBlwJYahEAKeL0rNP8')
    expect(contract).toEqual(contractFirestoreData['37dBlwJYahEAKeL0rNP8'])
  })
})
