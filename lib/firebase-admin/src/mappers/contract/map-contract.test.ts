import { contracts } from '../../utils/test/mocks/contract/contract'
import { contractData } from '../../utils/test/mocks/contract/contract-data'
import { mapContract } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapContract', () => {
  it('correct mapping', async () => {
    const mock = contracts['37dBlwJYahEAKeL0rNP8']!
    const fetchedContract = await mapContract(Promise.resolve(contractData['37dBlwJYahEAKeL0rNP8']!))
    expect(fetchedContract).toStrictEqual(mock)
  })
})
