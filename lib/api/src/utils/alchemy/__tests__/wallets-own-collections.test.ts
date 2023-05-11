/* eslint-disable @typescript-eslint/ban-ts-comment */
import { walletsOwnCollections } from '../wallets-own-collections'
import { users } from '@echo/firebase-admin'
import { generateMockContract } from '@echo/model'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Alchemy } from 'alchemy-sdk'

jest.mock('alchemy-sdk')

describe('utils - alchemy - walletsOwnCollections', () => {
  const mockedAlchemy = jest.mocked(Alchemy).mockReturnValue({
    // @ts-ignore
    nft: { verifyNftOwnership: jest.fn() }
  })
  const mockedClient = new mockedAlchemy()
  const wallets = users['oE6yUEQBPn7PZ89yMjKn']!.wallets!
  const contracts = [generateMockContract({}), generateMockContract({ address: '0xtest' })]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('empty wallets returns false', async () => {
    let ownsNfts = await walletsOwnCollections(mockedClient, [], [])
    expect(ownsNfts).toBeFalsy()
    ownsNfts = await walletsOwnCollections(mockedClient, [], contracts)
    expect(ownsNfts).toBeFalsy()
  })
  it('empty contracts returns false', async () => {
    const ownsNfts = await walletsOwnCollections(mockedClient, wallets, [])
    expect(ownsNfts).toBeFalsy()
  })
  it('if verifyNftOwnership returns an undefined value, returns false', async () => {
    // @ts-ignore
    jest.spyOn(mockedClient.nft, 'verifyNftOwnership').mockImplementation(() => {
      return Promise.resolve(undefined)
    })
    const ownsNfts = await walletsOwnCollections(mockedClient, wallets, contracts)
    expect(ownsNfts).toBeFalsy()
  })
  it('if user does not own a token from all collections, returns false', async () => {
    jest.spyOn(mockedClient.nft, 'verifyNftOwnership').mockImplementation((walletAddress) => {
      if (walletAddress === '0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8') {
        return Promise.resolve({ '0xtest': true, '0x1234567890': false })
      }
      return Promise.resolve({})
    })
    const ownsNfts = await walletsOwnCollections(mockedClient, wallets, contracts)
    expect(ownsNfts).toBeFalsy()
  })
  it('if user own a token from all collections, returns true', async () => {
    jest
      .spyOn(mockedClient.nft, 'verifyNftOwnership')
      .mockImplementation(() => Promise.resolve({ '0xtest': true, '0x1234567890': true }))
    const ownsNfts = await walletsOwnCollections(mockedClient, wallets, contracts)
    expect(ownsNfts).toBeTruthy()
  })
})
