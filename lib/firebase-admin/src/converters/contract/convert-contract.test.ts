import { getFirestoreContractData } from '../../data/contract/get-firestore-contract-data'
import { contractData } from '../../utils/test/mocks/contract/contract-data'
import { describe, expect, it } from '@jest/globals'

describe('convertContract', () => {
  it('correct conversion', async () => {
    const contract = await getFirestoreContractData('37dBlwJYahEAKeL0rNP8')
    expect(contract).toEqual(contractData['37dBlwJYahEAKeL0rNP8'])
  })
})
