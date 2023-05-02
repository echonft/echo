/* eslint-disable @typescript-eslint/ban-ts-comment */
import { walletsOwnTokens } from '../wallets-own-tokens'
import { offers, users } from '@echo/firebase-admin'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { Alchemy } from 'alchemy-sdk'

jest.mock('alchemy-sdk')

describe('utils - alchemy - walletsOwnTokens', () => {
  const mockedAlchemy = jest.mocked(Alchemy).mockReturnValue({
    // @ts-ignore
    nft: { getOwnersForNft: jest.fn() }
  })
  const mockedClient = new mockedAlchemy()
  const wallets = users['oE6yUEQBPn7PZ89yMjKn']!.wallets!
  const offerItemsSameContract = [
    offers['LyCfl6Eg7JKuD7XJ6IPi']!.senderItems[0]!,
    offers['LyCfl6Eg7JKuD7XJ6IPi']!.receiverItems[0]!
  ].map((item) => ({
    tokenId: item.tokenId.toString(),
    target: {
      address: item.contract.address,
      chainId: item.contract.chainId
    }
  }))
  const offerItemsDifferentContracts = offerItemsSameContract.concat(
    offerItemsSameContract.map((item) => ({ ...item, target: { ...item.target, address: '0xtest' } }))
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('empty wallets returns false', async () => {
    let ownsNfts = await walletsOwnTokens(mockedClient, [], offerItemsSameContract)
    expect(ownsNfts).toBeFalsy()
    ownsNfts = await walletsOwnTokens(mockedClient, [], [])
    expect(ownsNfts).toBeFalsy()
  })
  it('empty tokens returns false', async () => {
    const ownsNfts = await walletsOwnTokens(mockedClient, wallets, [])
    expect(ownsNfts).toBeFalsy()
  })
  it('if user does not own all tokens, returns false', async () => {
    jest.spyOn(mockedClient.nft, 'getOwnersForNft').mockImplementation((_contractAddress, tokenId) => {
      if (tokenId === offerItemsSameContract[0]!.tokenId) {
        return Promise.resolve({ owners: [wallets[0]!.address] })
      }
      return Promise.resolve({ owners: [] })
    })
    let ownNfts = await walletsOwnTokens(mockedClient, wallets, offerItemsDifferentContracts)
    expect(ownNfts).toBeFalsy()
    ownNfts = await walletsOwnTokens(mockedClient, wallets, [offerItemsDifferentContracts[1]!])
    expect(ownNfts).toBeFalsy()
  })

  it('if user owns all tokens, returns true', async () => {
    jest.spyOn(mockedClient.nft, 'getOwnersForNft').mockImplementation((_contractAddress, _tokenId) => {
      return Promise.resolve({ owners: [wallets[0]!.address] })
    })
    let ownNfts = await walletsOwnTokens(mockedClient, wallets, offerItemsDifferentContracts)
    expect(ownNfts).toBeTruthy()
    ownNfts = await walletsOwnTokens(mockedClient, wallets, [offerItemsDifferentContracts[1]!])
    expect(ownNfts).toBeTruthy()

    // Multiple wallets
    jest.spyOn(mockedClient.nft, 'getOwnersForNft').mockImplementation((_contractAddress, _tokenId) => {
      return Promise.resolve({ owners: [wallets[0]!.address, '0xtest'] })
    })
    ownNfts = await walletsOwnTokens(mockedClient, wallets, offerItemsDifferentContracts)
    expect(ownNfts).toBeTruthy()
  })
})
