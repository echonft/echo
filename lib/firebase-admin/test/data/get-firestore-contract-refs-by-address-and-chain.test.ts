import { getFirestoreContractRefsByAddressAndChainId } from '../../src/data/contract/get-firestore-contract-refs-by-address-and-chain-id'
import { contractFirestoreData } from '@echo/firestore'
import { describe, expect, it } from '@jest/globals'

describe('data - contract - getFirestoreContractRefsByAddressAndChain', () => {
  it('returns nothing if empty search', async () => {
    const contracts = await getFirestoreContractRefsByAddressAndChainId([])
    expect(contracts).toEqual([])
  })
  it('returns nothing if invalid search', async () => {
    const contracts = await getFirestoreContractRefsByAddressAndChainId([{ address: 'test', chainId: 1 }])
    expect(contracts).toEqual([])
  })
  it('returns valid contracts (single)', async () => {
    let contracts = await getFirestoreContractRefsByAddressAndChainId([
      { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 1 }
    ])
    contracts.map((contract) => expect(contract.path).toBe(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.refPath))
    contracts = await getFirestoreContractRefsByAddressAndChainId([
      { address: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b', chainId: 1 }
    ])
    contracts.map((contract) => expect(contract.path).toBe(contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!.refPath))
  })
  it('returns valid contracts (multiple)', async () => {
    const contracts = await getFirestoreContractRefsByAddressAndChainId([
      { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 1 },
      { address: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b', chainId: 1 }
    ])
    expect(contracts[0]!.path).toBe(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.refPath)
    expect(contracts[1]!.path).toBe(contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!.refPath)
  })
  it('returns only valid contracts (single)', async () => {
    let contracts = await getFirestoreContractRefsByAddressAndChainId([
      { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 1 },
      { address: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b', chainId: 0 }
    ])
    expect(contracts.length).toBe(1)
    expect(contracts[0]!.path).toBe(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.refPath)
    contracts = await getFirestoreContractRefsByAddressAndChainId([
      { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 1 },
      { address: 'test', chainId: 1 }
    ])
    expect(contracts.length).toBe(1)
    expect(contracts[0]!.path).toBe(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.refPath)
  })
  it('returns only valid contracts (multiple)', async () => {
    const contracts = await getFirestoreContractRefsByAddressAndChainId([
      { address: '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d', chainId: 1 },
      { address: '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b', chainId: 1 },
      { address: 'test', chainId: 0 }
    ])
    expect(contracts.length).toBe(2)
    expect(contracts[0]!.path).toBe(contractFirestoreData['37dBlwJYahEAKeL0rNP8']!.refPath)
    expect(contracts[1]!.path).toBe(contractFirestoreData['hK2XrmnMpCVneRH7Mbo6']!.refPath)
  })
})
