import { findContractByAddressAndChainId } from '../../../src/crud/contract/find-contract-by-address-and-chain-id'
import { contractFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - contract - findContractByAddressAndChainId', () => {
  const existingContract = contractFirestoreData['37dBlwJYahEAKeL0rNP8']!
  it('wrong address and chain id returns error', async () => {
    const contractResult = await findContractByAddressAndChainId({ address: 'test', chainId: 0 })
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('wrong address but right chain id returns error', async () => {
    const contractResult = await findContractByAddressAndChainId({ address: existingContract.address, chainId: 0 })
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('wrong chain id but right address returns error', async () => {
    const contractResult = await findContractByAddressAndChainId({ address: 'test', chainId: existingContract.chainId })
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('right query returns proper contract', async () => {
    const contractResult = await findContractByAddressAndChainId({
      address: existingContract.address,
      chainId: existingContract.chainId
    })
    expect(R.isOk(contractResult)).toBeTruthy()
    expect(R.getExn(contractResult)).toStrictEqual(existingContract)
  })
})
