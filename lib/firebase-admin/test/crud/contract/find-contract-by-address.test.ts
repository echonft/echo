import { findContractByAddress } from '../../../src/crud/contract/find-contract-by-address'
import { contractFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('crud - contract - findContractByAddress', () => {
  const existingContract = contractFirestoreData['37dBlwJYahEAKeL0rNP8']!
  it('wrong address and chain id returns error', async () => {
    try {
      await findContractByAddress({ address: 'test', chainId: 0 })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('wrong address but right chain id returns error', async () => {
    try {
      await findContractByAddress({ address: existingContract.address, chainId: 0 })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('wrong chain id but right address returns error', async () => {
    try {
      await findContractByAddress({ address: 'test', chainId: existingContract.chainId })
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('right query returns proper contract', async () => {
    const contract = await findContractByAddress({
      address: existingContract.address,
      chainId: existingContract.chainId
    })
    expect(contract).toStrictEqual(existingContract)
  })
})
