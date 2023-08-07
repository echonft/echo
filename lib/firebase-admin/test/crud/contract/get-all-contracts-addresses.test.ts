import { getAllContractsAddresses } from '../../../src/crud/contract/get-all-contracts-addresses'
import { describe, expect, it } from '@jest/globals'

describe('crud - contract - getAllContractsAddresses', () => {
  it('retrieves all contracts addresses from Firestore', async () => {
    const addresses = await getAllContractsAddresses()
    expect(addresses.length).toEqual(2)
    expect(addresses[0]).toEqual('0x12c63bbD266dB84e117356e664f3604055166CEc')
    expect(addresses[1]).toEqual('0x320e2fa93a4010ba47edcde762802374bac8d3f7')
  })
})
