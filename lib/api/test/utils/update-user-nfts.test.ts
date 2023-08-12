/* eslint-disable @typescript-eslint/ban-ts-comment */
import { updateUserNfts } from '../../src/utils/handler/update-user-nfts'
import { mockGetNftsForOwner, MockGetNftsForOwnerArgs } from '../mocks/alchemy/get-nfts-for-owner'
import { nftCollectionFirestoreData } from '../mocks/nft-collection-firestore-data'
import { nftFirestoreData } from '../mocks/nft-firestore-data'
import { userFirestoreData } from '../mocks/user-firestore-data'
import {
  addNft,
  findNftByCollection,
  findNftCollectionByAddress,
  getAllContractsAddresses,
  getUserWalletAddresses,
  updateNftOwner
} from '@echo/firestore'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore')
jest.mock('@echo/alchemy', () => ({
  getNftsForOwner: (args: MockGetNftsForOwnerArgs) => mockGetNftsForOwner(args)
}))

describe('utils - handler - updateUserNfts', () => {
  const mockUser = userFirestoreData['6rECUMhevHfxABZ1VNOm']!
  const mockNft = nftFirestoreData['8hHFadIrrooORfTOLkBg']!
  const mockNftCollection = nftCollectionFirestoreData['Rc8pLQXxgyQGIRL0fr13']!

  const mockedFindNftByCollection = jest.mocked(findNftByCollection).mockResolvedValue(mockNft)
  const mockedGetAllContractsAddresses = jest
    .mocked(getAllContractsAddresses)
    .mockResolvedValue(['0x12c63bbD266dB84e117356e664f3604055166CEc', '0x320e2fa93a4010ba47edcde762802374bac8d3f7'])
  // @ts-ignore
  const mockedUpdateNftOwner = jest.mocked(updateNftOwner).mockResolvedValue({})
  const mockedFindCollectionByAddress = jest.mocked(findNftCollectionByAddress).mockResolvedValue(mockNftCollection)
  // @ts-ignore
  const mockedAddNft = jest.mocked(addNft).mockResolvedValue({})
  jest.mocked(getUserWalletAddresses).mockImplementation((user) => user.wallets.map((wallet) => wallet.address))

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('if getAllContractsAddresses rejects, rejects', () => {
    mockedGetAllContractsAddresses.mockRejectedValueOnce(new Error('getAllContractsAddresses rejects'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())
  })

  it('if getAllContractsAddresses returns an error, rejects', () => {
    // @ts-ignore
    mockedGetAllContractsAddresses.mockRejectedValueOnce(new Error('test'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())
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
      .catch((e) => expect(e).toBeDefined())

    // Rejects if only 1 is rejection
    updateUserNfts({
      ...mockUser,
      wallets: [
        { address: 'reject', chainId: 1 },
        { address: 'test', chainId: 1 }
      ]
    })
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())
  })

  it('if getNftsForOwner errors, rejects', () => {
    updateUserNfts({ ...mockUser, wallets: [{ address: 'error', chainId: 1 }] })
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())

    // Fails if one is error
    updateUserNfts({
      ...mockUser,
      wallets: [
        { address: 'error', chainId: 1 },
        { address: 'test', chainId: 1 }
      ]
    })
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())
  })

  it('if findNftByCollection rejects, rejects', () => {
    mockedFindNftByCollection.mockRejectedValue(Error('test'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())
  })

  it('if findNftByCollection errors and findCollectionByAddress rejects, rejects', () => {
    // @ts-ignore
    mockedFindNftByCollection.mockRejectedValue(Error('test'))
    mockedFindCollectionByAddress.mockRejectedValue(Error('test'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())
  })

  it('if findNftByCollection errors and findCollectionByAddress errors, rejects', () => {
    // @ts-ignore
    mockedFindNftByCollection.mockRejectedValue(Error('test'))
    // @ts-ignore
    mockedFindCollectionByAddress.mockRejectedValue(Error('test'))
    updateUserNfts(mockUser)
      .then(() => expect(false).toBeTruthy())
      .catch((e) => expect(e).toBeDefined())
  })

  it('if findNftByCollection errors, addNft is called with proper value', () => {
    // @ts-ignore
    mockedFindNftByCollection.mockRejectedValue(Error('test'))
    mockedFindCollectionByAddress.mockResolvedValue(mockNftCollection)

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
    mockedFindNftByCollection.mockResolvedValue(mockNft)
    updateUserNfts(mockUser)
      .then((results) => {
        expect(results.length).toEqual(mockUser.wallets.length)
        expect(mockedUpdateNftOwner).nthCalledWith(mockUser.wallets.length, mockNft.id, mockUser.id)
      })
      .catch(() => expect(false).toBeTruthy())
  })
})
