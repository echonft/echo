import {
  createListingRequestErc1155ItemMock,
  createListingRequestErc721ItemMock,
  createListingRequestItemsMock,
  createListingRequestMock,
  createListingRequestTargetMock
} from '@echo/api/mocks/create-listing-request-mock'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { createListingRequestTransformSchema } from '@echo/backend/validators/create-listing-request-transform-schema'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { listingDocumentMock } from '@echo/firestore/mocks/listing-document-mock'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import type { NftDocument } from '@echo/firestore/types/model/nft-document'
import { ItemError } from '@echo/model/constants/errors/item-error'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { Expiration } from '@echo/model/constants/expiration'
import { type NftTokenType, TokenType } from '@echo/model/constants/token-type'
import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { erc1155ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'
import { erc1155NftMock, erc721NftMock } from '@echo/model/mocks/nft-mock'
import { userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import { toPromise } from '@echo/utils/helpers/to-promise'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { getTokenBalance } from '@echo/web3/services/get-token-balance'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { andThen, assoc, assocPath, find, isNil, modify, pipe } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

interface ExpectedReturn extends Pick<Listing, 'items' | 'target' | 'creator'> {
  expiration: Expiration
}

jest.mock('@echo/firestore/crud/nft/get-nft-by-index')
jest.mock('@echo/firestore/crud/collection/get-collection')
jest.mock('@echo/web3/services/get-token-balance')
jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/listing/get-listing-by-signature')

describe('validators - createListingRequestTransformSchema', () => {
  function findNftByIndex(index: NftIndex): Promise<Nullable<NftDocument>> {
    return pipe<[NftDocument[]], Nullable<NftDocument>, Promise<Nullable<NftDocument>>>(
      find<NftDocument>(eqNft(index)),
      toPromise<Nullable<NftDocument>>
    )([erc721NftMock, erc1155NftMock])
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getUserByUsername).mockResolvedValue(userDocumentMockJohnny)
    jest.mocked(getListingBySignature).mockResolvedValue(undefined)
    jest.mocked(getNftByIndex).mockImplementation(findNftByIndex)
    jest.mocked(getCollection).mockResolvedValue(collectionMockPx)
    jest.mocked(getTokenBalance).mockResolvedValue(createListingRequestErc1155ItemMock.quantity + 2)
  })

  it('invalid if an item ownership is not right', async () => {
    jest
      .mocked(getNftByIndex)
      .mockImplementation(pipe(findNftByIndex, andThen(assocPath(['owner', 'username'], 'another-user'))))
    const schema = await createListingRequestTransformSchema(userDocumentMockJohnny.username)
    await expect(schema.parseAsync(createListingRequestMock)).rejects.toEqual(
      ZodError.create([
        {
          code: ZodIssueCode.custom,
          message: NftError.Ownership,
          path: ['items']
        }
      ])
    )
  })

  it('invalid if an item token type does not match the NFT type', async () => {
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
    const schema = await createListingRequestTransformSchema(userDocumentMockJohnny.username)
    await expect(schema.parseAsync(createListingRequestMock)).rejects.toEqual(
      ZodError.create([
        {
          code: ZodIssueCode.custom,
          message: ItemError.Type,
          path: ['items']
        }
      ])
    )
  })

  it('invalid if an ERC1155 item token balance is smaller than the quantity', async () => {
    jest.mocked(getTokenBalance).mockResolvedValue(createListingRequestErc1155ItemMock.quantity - 1)
    const schema = await createListingRequestTransformSchema(userDocumentMockJohnny.username)
    await expect(schema.parseAsync(createListingRequestMock)).rejects.toEqual(
      ZodError.create([
        {
          code: ZodIssueCode.custom,
          message: ItemError.Quantity,
          path: ['items']
        }
      ])
    )
  })

  it('invalid if items are not all on the same chain', async () => {
    jest.mocked(getNftByIndex).mockImplementation(
      pipe(
        findNftByIndex,
        andThen<Nullable<NftDocument>, Nullable<NftDocument>>((nft) => {
          if (!isNil(nft) && nft.tokenId === createListingRequestErc721ItemMock.token.tokenId) {
            return assocPath(['collection', 'contract', 'chain'], 'other-chain', nft) as Nullable<NftDocument>
          }
          return nft
        })
      )
    )

    const schema = await createListingRequestTransformSchema(userDocumentMockJohnny.username)
    await expect(schema.parseAsync(createListingRequestMock)).rejects.toEqual(
      ZodError.create([
        {
          code: ZodIssueCode.custom,
          message: ItemError.Chain,
          path: ['items']
        }
      ])
    )
  })

  it('invalid if the listing already exists', async () => {
    const schema = await createListingRequestTransformSchema(userDocumentMockJohnny.username)
    jest
      .mocked(getListingBySignature)
      .mockResolvedValueOnce(assoc('items', createListingRequestItemsMock, listingDocumentMock))
    await expect(schema.parseAsync(createListingRequestMock)).rejects.toEqual(
      ZodError.create([
        {
          code: ZodIssueCode.custom,
          message: ListingError.Exists,
          path: []
        }
      ])
    )
  })

  it('throws if the user is not found', async () => {
    jest.mocked(getUserByUsername).mockResolvedValue(undefined)
    await expect(createListingRequestTransformSchema(userDocumentMockJohnny.username)).rejects.toBeInstanceOf(
      UnauthorizedError
    )
  })

  it('valid', async () => {
    const schema = await createListingRequestTransformSchema(userDocumentMockJohnny.username)
    const expectedValue: ExpectedReturn = {
      creator: userMockJohnny,
      expiration: Expiration.OneDay,
      items: [erc721ItemMock, erc1155ItemMock],
      target: {
        collection: collectionMockPx,
        quantity: createListingRequestTargetMock.quantity
      }
    }
    const parsedValue = await schema.parseAsync(createListingRequestMock)
    expect(parsedValue).toStrictEqual(expectedValue)
  })
})
