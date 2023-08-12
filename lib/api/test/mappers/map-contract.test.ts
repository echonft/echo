import { mapContract } from '../../src/mappers/contract/map-contract'
import { contractFirestoreData } from '../mocks/contract-firestore-data'
import { contracts } from '@echo/ui'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapContract', () => {
  it('correct mapping', async () => {
    const mock = contracts['37dBlwJYahEAKeL0rNP8']!
    const fetchedContract = await mapContract(Promise.resolve(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!))
    expect(fetchedContract).toStrictEqual(mock)
  })
})
