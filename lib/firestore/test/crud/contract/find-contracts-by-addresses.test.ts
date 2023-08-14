import { findContractsByAddresses } from '../../../src/crud/contract/find-contracts-by-addresses'
import { contractFirestoreData } from '../../mocks/contract/contract-firestore-data'
import { describe, expect, it } from '@jest/globals'

describe('crud - contract - findContractsByAddresses', () => {
  const contract1 = contractFirestoreData['37dBlwJYahEAKeL0rNP8']!
  const contract2 = contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!
  it('empty contracts returns error', async () => {
    try {
      await findContractsByAddresses([])
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('wrong address and chain id returns error', async () => {
    try {
      await findContractsByAddresses([{ address: 'test', chainId: 0 }])
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('wrong address but right chain id returns error', async () => {
    try {
      await findContractsByAddresses([{ address: contract1.address, chainId: 0 }])
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('wrong chain id but right address returns error', async () => {
    try {
      await findContractsByAddresses([{ address: 'test', chainId: contract1.chainId }])
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('one right contract and one wrong returns error', async () => {
    try {
      await findContractsByAddresses([
        { address: 'test', chainId: contract1.chainId },
        { address: contract1.address, chainId: contract1.chainId }
      ])
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
  it('right query returns proper contracts (single)', async () => {
    const contracts = await findContractsByAddresses([
      {
        address: contract1.address,
        chainId: contract1.chainId
      }
    ])
    expect(contracts[0]).toStrictEqual(contract1)
  })
  it('right query returns proper contracts (multiple)', async () => {
    const contracts = await findContractsByAddresses([
      {
        address: contract1.address,
        chainId: contract1.chainId
      },
      {
        address: contract2.address,
        chainId: contract2.chainId
      }
    ])
    expect(contracts[0]).toStrictEqual(contract1)
    expect(contracts[1]).toStrictEqual(contract2)
  })
})
