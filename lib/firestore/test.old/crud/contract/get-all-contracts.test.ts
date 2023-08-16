import { getAllContracts } from '../../../src/crud/contract/get-all-contracts'
import { contractFirestoreData } from '../../mocks/contract/contract-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - contract - getAllContracts', () => {
  it('retrieves all contracts from Firestore', async () => {
    const contracts = await getAllContracts()
    expect(contracts.length).toEqual(2)
    expect(contracts[0]).toEqual(contractFirestoreData['37dBlwJYahEAKeL0rNP8'])
    expect(contracts[1]).toEqual(contractFirestoreData['hK2XrmnMpCVneRH7Mbo6'])
  })
})
