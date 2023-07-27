import { getAllContractsAddresses } from '../../../src/crud/contract/get-all-contracts-addresses'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - contract - getAllContractsAddresses', () => {
  it('retrieves all contracts addresses from Firestore', async () => {
    const result = await getAllContractsAddresses()
    expect(R.isError(result)).toBeFalsy()
    const data = R.getExn(result)
    expect(data.length).toEqual(2)
    expect(data[0]).toEqual('0x12c63bbD266dB84e117356e664f3604055166CEc')
    expect(data[1]).toEqual('0x320e2fa93a4010ba47edcde762802374bac8d3f7')
  })
})
