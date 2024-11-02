import { createListing } from '@echo/backend/actions/create-listing'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { addListing, type AddListingArgs } from '@echo/firestore/crud/listing/add-listing'
import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { ItemError } from '@echo/model/constants/errors/item-error'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { Expiration } from '@echo/model/constants/expiration'
import { type NftTokenType, TokenType } from '@echo/model/constants/token-type'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { erc1155ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { erc1155NftMock, erc721NftMock } from '@echo/model/mocks/nft-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { NftIndex } from '@echo/model/types/nft'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { getTokenBalance } from '@echo/web3/services/get-token-balance'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { andThen, assocPath, dissoc, find, modify, pipe } from 'ramda'

jest.mock('@echo/backend/helpers/get-auth-user')
jest.mock('@echo/firestore/services/initialize-firebase')
jest.mock('@echo/firestore/crud/listing/add-listing')
jest.mock('@echo/firestore/crud/listing/get-listing-by-signature')
jest.mock('@echo/firestore/crud/nft/get-nft-by-index')
jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/web3/services/get-token-balance')

describe('createListing', () => {
  function findNftByIndex(index: NftIndex): Promise<Nullable<NftDocument>> {
    return Promise.resolve(find(eqNft(index as NftDocument), [erc721NftMock, erc1155NftMock]))
  }

  const args: AddListingArgs = {
    creator: listingMock.creator,
    items: [erc721ItemMock, erc1155ItemMock],
    target: listingMock.target,
    expiration: Expiration.OneDay
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getAuthUser).mockResolvedValue(userMockJohnny.username)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.mocked(initializeFirebase).mockImplementation(() => {})
    jest.mocked(getUserByUsername).mockResolvedValue(userDocumentMockJohnny)
    jest.mocked(getListingBySignature).mockResolvedValue(undefined)
    jest.mocked(getNftByIndex).mockImplementation(findNftByIndex)
    jest.mocked(getTokenBalance).mockResolvedValue(erc1155ItemMock.quantity + 2)
  })

  it('throws if an item is not found', async () => {
    jest.mocked(getNftByIndex).mockResolvedValue(undefined)
    await expect(createListing(args)).rejects.toEqual(Error(NftError.NotFound))
  })

  it('throws if an item ownership is not right', async () => {
    jest
      .mocked(getNftByIndex)
      .mockImplementation(pipe(findNftByIndex, andThen(assocPath(['owner', 'username'], 'another-user'))))
    await expect(createListing(args)).rejects.toEqual(Error(AuthError.Forbidden))
  })

  it('throws if an item token type does not match the NFT type', async () => {
    jest.mocked(getNftByIndex).mockImplementation(
      pipe(
        findNftByIndex,
        andThen(
          unlessNil<NftDocument, NftDocument>(
            modify<'type', NftTokenType, NftTokenType>('type', (type: TokenType) => {
              if (type === TokenType.Erc721) {
                return TokenType.Erc1155
              }
              return TokenType.Erc721
            })<NftDocument>
          )
        )
      )
    )
    await expect(createListing(args)).rejects.toEqual(Error(ItemError.Type))
  })

  it('throws if an ERC1155 item token balance is smaller than the quantity', async () => {
    jest.mocked(getTokenBalance).mockResolvedValue(erc1155ItemMock.quantity - 1)
    await expect(createListing(args)).rejects.toEqual(Error(ItemError.Quantity))
  })

  it('throws if the listing already exists', async () => {
    jest.mocked(getListingBySignature).mockResolvedValueOnce(listingDocumentMock)
    await expect(createListing(args)).rejects.toEqual(Error(ListingError.Exists))
  })

  it('throws if auth user is not found', async () => {
    jest.mocked(getAuthUser).mockResolvedValue(undefined)
    await expect(createListing(args)).rejects.toEqual(Error(AuthError.Unauthorized))
  })

  it('throws if the user is not found', async () => {
    jest.mocked(getUserByUsername).mockResolvedValue(undefined)
    await expect(createListing(args)).rejects.toEqual(Error(UserError.NotFound))
  })

  it('throws if the user does not have a wallet', async () => {
    jest.mocked(getUserByUsername).mockResolvedValue(dissoc('wallet', userDocumentMockJohnny))
    await expect(createListing(args)).rejects.toEqual(Error(WalletError.NotFound))
  })

  it('valid', async () => {
    jest.mocked(addListing).mockResolvedValue({ id: 'listing-id', data: listingDocumentMock })
    await expect(createListing(args)).resolves.toStrictEqual(listingMock)
  })
})
