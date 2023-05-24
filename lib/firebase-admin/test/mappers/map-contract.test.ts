import { contractFirestoreData, mapContract } from '@echo/firestore'
import { contracts } from '@echo/model'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapContract', () => {
  it('correct mapping', async () => {
    const mock = contracts['37dBlwJYahEAKeL0rNP8']!
    const fetchedContract = await mapContract(Promise.resolve(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!))
    expect(fetchedContract).toStrictEqual(mock)
  })
})
