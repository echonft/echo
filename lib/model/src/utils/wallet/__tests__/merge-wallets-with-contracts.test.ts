import { generateMockContract } from '../../tests/mocks/contract'
import { generateMockWallet } from '../../tests/mocks/wallet'
import { mergeWalletsAndContractsByChainId } from '../merge-wallets-with-contracts'
import { describe, expect, test } from '@jest/globals'

describe('Merge wallets with contracts', () => {
  test('Empty contracts and wallets returns empty array', () => {
    expect(mergeWalletsAndContractsByChainId([], [])).toEqual({})
  })
  test('Empty contracts with wallets returns empty array', () => {
    const wallets = ['0x1', '0x2', '0x3'].map((address) => generateMockWallet({ address }))
    expect(mergeWalletsAndContractsByChainId(wallets, [])).toEqual({})
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(mergeWalletsAndContractsByChainId([wallets[0]!], [])).toEqual({})
  })
  test('Empty wallets with contracts returns empty array', () => {
    const contracts = ['0x1', '0x2', '0x3'].map((address) => generateMockContract({ address }))
    expect(mergeWalletsAndContractsByChainId([], contracts)).toEqual({})
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(mergeWalletsAndContractsByChainId([], [contracts[0]!])).toEqual({})
  })
  test('Wallets with contracts from different chains returns empty array', () => {
    const wallets = ['0x1', '0x2', '0x3'].map((address) => generateMockWallet({ address, chainId: 2 }))
    const contracts = ['0x1', '0x2', '0x3'].map((address) => generateMockContract({ address }))
    expect(mergeWalletsAndContractsByChainId(wallets, contracts)).toEqual({})
  })
  test('Wallets with contracts returns proper value', () => {
    const walletsChain1 = ['0x1', '0x2'].map((address) => generateMockWallet({ address }))
    const walletsChain2 = ['0x3'].map((address) => generateMockWallet({ address, chainId: 2 }))
    // Wallets on different chains than any of the contracts won't be present
    const walletsChain3 = ['0x4'].map((address) => generateMockWallet({ address, chainId: 3 }))

    const contractsChain1 = ['0x1', '0x2'].map((address) => generateMockContract({ address }))
    const contractsChain2 = ['0x3'].map((address) => generateMockContract({ address, chainId: 2 }))
    // Contracts on chain with no wallets associated to it won't be present
    const contractsChain4 = ['0x4'].map((address) => generateMockContract({ address, chainId: 4 }))

    const result = {
      '1': {
        contracts: contractsChain1,
        wallets: walletsChain1
      },
      '2': {
        contracts: contractsChain2,
        wallets: walletsChain2
      }
    }

    expect(
      mergeWalletsAndContractsByChainId(
        [...walletsChain1, ...walletsChain2, ...walletsChain3],
        [...contractsChain1, ...contractsChain2, ...contractsChain4]
      )
    ).toEqual(result)
  })
})
