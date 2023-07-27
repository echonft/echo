import { getAllContracts } from '../../../src/crud/contract/get-all-contracts'
import { contractFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - contract - getAllContracts', () => {
  it('retrieves all contracts from Firestore', async () => {
    const result = await getAllContracts()
    expect(R.isError(result)).toBeFalsy()
    const data = R.getExn(result)
    expect(data.length).toEqual(2)
    expect(data[0]).toEqual(contractFirestoreData['37dBlwJYahEAKeL0rNP8'])
    expect(data[1]).toEqual(contractFirestoreData['hK2XrmnMpCVneRH7Mbo6'])
  })
})
