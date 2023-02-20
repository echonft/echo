import { getFirestoreContractData } from '../../data/contract/get-firestore-contract-data'
import { contract } from '../../utils/test/mocks/contract/contract'
import { mapContract } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { pipe } from 'ramda'

describe('mapContract', () => {
  it('correct mapping', async () => {
    const fetchedContract = await pipe(getFirestoreContractData, mapContract)('37dBlwJYahEAKeL0rNP8')
    expect(fetchedContract).toEqual(contract)
  })
})
