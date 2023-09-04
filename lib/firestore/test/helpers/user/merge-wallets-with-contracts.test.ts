import { mergeWalletsAndContractsByChainId } from '../../../src/helpers/user/merge-wallets-with-contracts'
import { userMock } from '../../mocks/user-mock'
import { Contract } from '@echo/firestore-types'
import { describe, expect, test } from '@jest/globals'

describe('Merge wallets with contracts', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const mockWallet = userMock['oE6yUEQBPn7PZ89yMjKn']!.wallets[0]!
  const mockContract: Contract = {
    tokenType: 'ERC721',
    address: '0x12c63bbD266dB84e117356e664f3604055166CEc',
    chainId: 1,
    name: 'Mythics Genesis',
    symbol: 'MGEN'
  }
  test('Empty contracts and wallets returns empty array', () => {
    expect(mergeWalletsAndContractsByChainId([], [])).toEqual({})
  })
  test('Empty contracts with wallets returns empty array', () => {
    const wallets = ['0x1', '0x2', '0x3'].map((address) => ({ ...mockWallet, address }))
    expect(mergeWalletsAndContractsByChainId(wallets, [])).toEqual({})
    expect(mergeWalletsAndContractsByChainId([wallets[0]!], [])).toEqual({})
  })
  test('Empty wallets with contracts returns empty array', () => {
    const contracts = ['0x1', '0x2', '0x3'].map((address) => ({ ...mockContract, address }))
    expect(mergeWalletsAndContractsByChainId([], contracts)).toEqual({})
    expect(mergeWalletsAndContractsByChainId([], [contracts[0]!])).toEqual({})
  })
  test('Wallets with contracts from different chains returns empty array', () => {
    const wallets = ['0x1', '0x2', '0x3'].map((address) => ({ ...mockWallet, address, chainId: 2 }))
    const contracts = ['0x1', '0x2', '0x3'].map((address) => ({ ...mockContract, address }))
    expect(mergeWalletsAndContractsByChainId(wallets, contracts)).toEqual({})
  })
  test('Wallets with contracts returns proper value', () => {
    const walletsChain1 = ['0x1', '0x2'].map((address) => ({ ...mockWallet, address }))
    const walletsChain2 = ['0x3'].map((address) => ({ ...mockWallet, address, chainId: 2 }))
    // Wallets on different chains than any of the contracts won't be present
    const walletsChain3 = ['0x4'].map((address) => ({ ...mockWallet, address, chainId: 3 }))

    const contractsChain1 = ['0x1', '0x2'].map((address) => ({ ...mockContract, address }))
    const contractsChain2 = ['0x3'].map((address) => ({ ...mockContract, address, chainId: 2 }))
    // Contracts on chain with no wallets associated to it won't be present
    const contractsChain4 = ['0x4'].map((address) => ({ ...mockContract, address, chainId: 4 }))

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
