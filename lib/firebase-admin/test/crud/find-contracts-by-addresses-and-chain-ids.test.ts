import { contractFirestoreData } from '../../../firestore/src'
import { findContractsByAddressesAndChainIds } from '../../src/crud/contract/find-contracts-by-addresses-and-chain-ids'
import { describe, expect, it } from '@jest/globals'
import { R } from '@mobily/ts-belt'

describe('crud - contract - findContractsByAddressesAndChainIds', () => {
  const contract1 = contractFirestoreData['37dBlwJYahEAKeL0rNP8']!
  const contract2 = contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!
  it('empty contracts returns error', async () => {
    const contractResult = await findContractsByAddressesAndChainIds([])
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('wrong address and chain id returns error', async () => {
    const contractResult = await findContractsByAddressesAndChainIds([{ address: 'test', chainId: 0 }])
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('wrong address but right chain id returns error', async () => {
    const contractResult = await findContractsByAddressesAndChainIds([{ address: contract1.address, chainId: 0 }])
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('wrong chain id but right address returns error', async () => {
    const contractResult = await findContractsByAddressesAndChainIds([{ address: 'test', chainId: contract1.chainId }])
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('one right contract and one wrong returns error', async () => {
    const contractResult = await findContractsByAddressesAndChainIds([
      { address: 'test', chainId: contract1.chainId },
      { address: contract1.address, chainId: contract1.chainId }
    ])
    expect(R.isError(contractResult)).toBeTruthy()
  })
  it('right query returns proper contracts (single)', async () => {
    const contractResult = await findContractsByAddressesAndChainIds([
      {
        address: contract1.address,
        chainId: contract1.chainId
      }
    ])
    expect(R.isOk(contractResult)).toBeTruthy()
    expect(R.getExn(contractResult)[0]!).toStrictEqual(contract1)
  })
  it('right query returns proper contracts (multiple)', async () => {
    const contractResult = await findContractsByAddressesAndChainIds([
      {
        address: contract1.address,
        chainId: contract1.chainId
      },
      {
        address: contract2.address,
        chainId: contract2.chainId
      }
    ])
    expect(R.isOk(contractResult)).toBeTruthy()
    expect(R.getExn(contractResult)[0]!).toStrictEqual(contract1)
    expect(R.getExn(contractResult)[1]!).toStrictEqual(contract2)
  })
})
