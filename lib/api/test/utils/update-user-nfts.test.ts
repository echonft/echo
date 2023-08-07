/* eslint-disable @typescript-eslint/ban-ts-comment */
import { mockGetNftsForOwner } from '../../src/mocks/alchemy/get-nfts-for-owner'
import { updateUserNfts } from '../../src/utils/handler/update-user-nfts'
import {
  addNft,
  findCollectionByAddress,
  findNftByCollection,
  getAllContractsAddresses,
  getUserWalletAddresses,
  updateNftOwner
} from '@echo/firebase-admin'
import { nftCollectionFirestoreData, nftFirestoreData, userFirestoreData } from '@echo/firestore'
import { errorMessage } from '@echo/utils'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { R } from '@mobily/ts-belt'

jest.mock('@echo/firebase-admin')
jest.mock('@echo/alchemy', () => ({
  getNftsForOwner: mockGetNftsForOwner
}))

describe('utils - handler - updateUserNfts', () => {
  const mockUser = userFirestoreData['6rECUMhevHfxABZ1VNOm']!
  const mockNft = nftFirestoreData['8hHFadIrrooORfTOLkBg']!
  const mockNftCollection = nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!

  const mockedFindNftByCollection = jest
    .mocked(findNftByCollection)
    .mockResolvedValue(R.fromNullable(mockNft, Error('Test')))
  const mockedGetAllContractsAddresses = jest
    .mocked(getAllContractsAddresses)
    .mockResolvedValue(
      R.fromNullable(
        ['0x12c63bbD266dB84e117356e664f3604055166CEc', '0x320e2fa93a4010ba47edcde762802374bac8d3f7'],
        Error('should not happen')
      )
    )
  // @ts-ignore
  const mockedUpdateNftOwner = jest.mocked(updateNftOwner).mockResolvedValue({})
  const mockedFindCollectionByAddress = jest
    .mocked(findCollectionByAddress)
    .mockResolvedValue(R.fromNullable(mockNftCollection, Error('should not happen')))
  // @ts-ignore
  const mockedAddNft = jest.mocked(addNft).mockResolvedValue({})
  jest.mocked(getUserWalletAddresses).mockImplementation((user) => user.wallets.map((wallet) => wallet.address))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if getAllContractsAddresses rejects, rejects', () => {
    mockedGetAllContractsAddresses.mockRejectedValueOnce(Error('getAllContractsAddresses rejects'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('getAllContractsAddresses rejects'))
  })

  it('if getAllContractsAddresses returns an error, rejects', () => {
    // @ts-ignore
    mockedGetAllContractsAddresses.mockResolvedValueOnce(R.fromNullable('error'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('Error fetching contract addresses'))
  })

  it('if user has no wallets, expect no write', () => {
    updateUserNfts({ ...mockUser, wallets: [] })
      .then((results) => {
        expect(results.length).toEqual(0)
        expect(mockedUpdateNftOwner).toHaveBeenCalledTimes(0)
      })
      .catch(() => expect(false).toBeTruthy())
  })

  it('if getNftsForOwner rejects, rejects', () => {
    updateUserNfts({ ...mockUser, wallets: [{ address: 'reject', chainId: 1 }] })
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('mockGetNftsForOwner error'))

    // Rejects if only 1 is rejection
    updateUserNfts({
      ...mockUser,
      wallets: [
        { address: 'reject', chainId: 1 },
        { address: 'test', chainId: 1 }
      ]
    })
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('mockGetNftsForOwner error'))
  })

  it('if getNftsForOwner errors, rejects', () => {
    updateUserNfts({ ...mockUser, wallets: [{ address: 'error', chainId: 1 }] })
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('Error fetching NFTs from alchemy'))

    // Fails if one is error
    updateUserNfts({
      ...mockUser,
      wallets: [
        { address: 'error', chainId: 1 },
        { address: 'test', chainId: 1 }
      ]
    })
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('Error fetching NFTs from alchemy'))
  })

  it('if findNftByCollection rejects, rejects', () => {
    mockedFindNftByCollection.mockRejectedValue(Error('test'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('test'))
  })

  it('if findNftByCollection errors and findCollectionByAddress rejects, rejects', () => {
    // @ts-ignore
    mockedFindNftByCollection.mockResolvedValue(R.fromNullable(undefined, 'test'))
    mockedFindCollectionByAddress.mockRejectedValue(Error('test'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('test'))
  })

  it('if findNftByCollection errors and findCollectionByAddress errors, rejects', () => {
    // @ts-ignore
    mockedFindNftByCollection.mockResolvedValue(R.fromNullable(undefined, 'test'))
    // @ts-ignore
    mockedFindCollectionByAddress.mockResolvedValue(R.fromNullable(undefined, 'test'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(errorMessage(e)).toEqual('Could not find collection'))
  })

  it('if findNftByCollection errors, addNft is called with proper value', () => {
    // @ts-ignore
    mockedFindNftByCollection.mockResolvedValue(R.fromNullable(undefined, 'test'))
    mockedFindCollectionByAddress.mockResolvedValue(R.fromNullable(mockNftCollection, Error('should not happen')))

    updateUserNfts(mockUser)
      .then(() => {
        expect(mockedAddNft).nthCalledWith(mockUser.wallets.length, {
          collectionId: 'Rc8pLQXxgyQGIRL0fr13',
          ownerId: '6rECUMhevHfxABZ1VNOm',
          tokenId: 1
        })
      })
      .catch(() => expect(false).toBeTruthy())
  })

  it('if success, expect updateNftOwner to be called with proper values', () => {
    mockedFindNftByCollection.mockResolvedValue(R.fromNullable(mockNft, Error('Test')))
    updateUserNfts(mockUser)
      .then((results) => {
        expect(results.length).toEqual(mockUser.wallets.length)
        expect(mockedUpdateNftOwner).nthCalledWith(mockUser.wallets.length, mockNft.id, mockUser.id)
      })
      .catch(() => expect(false).toBeTruthy())
  })
})
