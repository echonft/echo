import { type CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import { UnauthorizedError } from '@echo/backend/errors/unauthorized-error'
import { createListingRequestTransformSchema } from '@echo/backend/validators/create-listing-request-transform-schema'
import { getCollection } from '@echo/firestore/crud/collection/get-collection'
import { getListingBySignature } from '@echo/firestore/crud/listing/get-listing-by-signature'
import { getNftByIndex } from '@echo/firestore/crud/nft/get-nft-by-index'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db/user/get-user-document-data-mock-by-username'
import { collectionMockSpiralId } from '@echo/firestore/test/initialize-db'
import { ItemError } from '@echo/model/constants/errors/item-error'
import { ListingError } from '@echo/model/constants/errors/listing-error'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { Expiration } from '@echo/model/constants/expiration'
import { TokenType } from '@echo/model/constants/token-type'
import { toNftCollection } from '@echo/model/mappers/collection/to-nft-collection'
import { collectionMockPxContract, collectionMockPxSlug } from '@echo/model/mocks/collection-mock'
import { getCollectionMockById } from '@echo/model/mocks/collection/get-collection-mock-by-id'
import { listingMock } from '@echo/model/mocks/listing-mock'
import { getUserMockByUsername, userMockJohnny } from '@echo/model/mocks/user-mock'
import type { Collection } from '@echo/model/types/collection'
import type { Erc1155Item } from '@echo/model/types/erc1155-item'
import type { Erc721Item } from '@echo/model/types/erc721-item'
import type { Listing } from '@echo/model/types/listing'
import type { NftIndex } from '@echo/model/types/nft'
import type { OwnedNft } from '@echo/model/types/owned-nft'
import { getErc1155TokenBalance } from '@echo/web3/services/get-erc1155-token-balance'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc, assocPath, dissoc, pipe } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

interface ExpectedReturn extends Pick<Listing, 'items' | 'target' | 'creator'> {
  expiration: Expiration
}

jest.mock('@echo/firestore/crud/nft/get-nft-by-index')
jest.mock('@echo/firestore/crud/collection/get-collection')
jest.mock('@echo/web3/services/get-erc1155-token-balance')
jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/listing/get-listing-by-signature')

describe('validators - createListingRequestTransformSchema', () => {
  const creator = userMockJohnny
  const erc721Nft: OwnedNft = {
    attributes: [
      { value: 'archimedean', trait: 'Algorithm' },
      { value: 'main', trait: 'Ring' },
      { value: 'movie', trait: 'Animation' },
      { value: '5', trait: 'Speed' },
      { value: 'cumulus', trait: 'Density' },
      { value: '0001', trait: 'Colors' },
      { value: 'random1', trait: 'Palette' },
      { value: '#complement', trait: 'Background' }
    ],
    collection: pipe(collectionMockSpiralId, getCollectionMockById, toNftCollection)(),
    name: 'Spiral Frequencies #1',
    owner: getUserMockByUsername(creatorUsername),
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
    tokenId: 1,
    type: TokenType.Erc721
  }
  const erc1155Nft: OwnedNft = {
    attributes: [
      {
        value: 'hyperbolic',
        trait: 'Algorithm'
      },
      {
        value: 'main',
        trait: 'Ring'
      },
      {
        value: 'short',
        trait: 'Animation'
      },
      {
        value: '5',
        trait: 'Speed'
      },
      {
        value: 'cumulus',
        trait: 'Density'
      },
      {
        value: '0001',
        trait: 'Colors'
      },
      {
        value: 'random1',
        trait: 'Palette'
      },
      {
        value: '#complement',
        trait: 'Background'
      }
    ],
    collection: pipe(collectionMockSpiralId, getCollectionMockById, toNftCollection)(),
    name: 'Spiral Frequencies #2',
    owner: getUserMockByUsername(creatorUsername),
    pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
    tokenId: 2,
    type: TokenType.Erc1155
  }
  const collection: Collection = {
    contract: collectionMockPxContract(),
    description: 'pxMythics is an 1,077 piece NFT collection based on the greatest mythologies throughout history.',
    discordUrl: 'https://discord.gg/pxmythics',
    name: 'pxMythics Genesis',
    slug: collectionMockPxSlug(),
    profilePictureUrl:
      'https://i.seadn.io/gae/R3b_Ju-BF7Ae45pp1f7UxCS5wF06dfFG7ydux_v9S8lJ7CL3j4kgv7a0nM4yVw-GhOH21ZigeaNluK-nuo6Dclq9LdQYH2Cvj8PfMQ',
    totalSupply: 1077,
    type: TokenType.Erc721,
    verified: true
  }
  const expiration = Expiration.OneDay
  const erc1155ItemQuantity = 1
  const targetQuantity = 1
  const validRequest: CreateListingRequest = {
    items: [
      {
        token: {
          collection: {
            slug: erc721Nft.collection.slug
          },
          tokenId: erc721Nft.tokenId,
          type: TokenType.Erc721
        }
      },
      {
        token: {
          collection: {
            slug: erc1155Nft.collection.slug
          },
          tokenId: erc1155Nft.tokenId,
          type: TokenType.Erc1155
        },
        quantity: erc1155ItemQuantity
      }
    ],
    target: {
      collection: {
        slug: collection.slug
      },
      quantity: targetQuantity
    },
    expiration
  }
  const expectedErc721Item: Erc721Item = {
    token: {
      contract: erc721Nft.collection.contract,
      collection: dissoc('contract', erc721Nft.collection),
      name: 'Spiral Frequencies #1',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/bc7e85d32d9391374695bc88926b532b',
      tokenId: 1,
      type: TokenType.Erc721
    }
  }
  const expectedErc1155Item: Erc1155Item = {
    token: {
      contract: erc1155Nft.collection.contract,
      collection: dissoc('contract', erc1155Nft.collection),
      name: 'Spiral Frequencies #2',
      pictureUrl: 'https://nft-cdn.alchemy.com/eth-mainnet/c8ced259cc0a40a5a42d22182e82f9de',
      tokenId: 2,
      type: TokenType.Erc1155
    },
    quantity: erc1155ItemQuantity
  }
  const expectedTarget: Listing['target'] = {
    collection,
    quantity: targetQuantity
  }

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getUserByUsername).mockResolvedValue(getUserDocumentDataMockByUsername(creatorUsername))
    jest.mocked(getListingBySignature).mockResolvedValue(undefined)
    jest.mocked(getNftByIndex).mockImplementation((index: NftIndex) => {
      if (index.tokenId === erc721Nft.tokenId) {
        return Promise.resolve(erc721Nft)
      }
      if (index.tokenId === erc1155Nft.tokenId) {
        return Promise.resolve(erc1155Nft)
      }
      return Promise.resolve(undefined)
    })
    jest.mocked(getCollection).mockResolvedValue(collection)
    jest.mocked(getErc1155TokenBalance).mockResolvedValue(erc1155ItemQuantity + 2)
  })

  it('invalid if an item ownership is not right', async () => {
    jest.mocked(getNftByIndex).mockImplementation((index: NftIndex) => {
      if (index.tokenId === erc721Nft.tokenId) {
        return Promise.resolve(assocPath(['owner', 'username'], 'another-user', erc721Nft))
      }
      if (index.tokenId === erc1155Nft.tokenId) {
        return Promise.resolve(erc1155Nft)
      }
      return Promise.resolve(undefined)
    })
    const schema = await createListingRequestTransformSchema(creatorUsername)
    await expect(schema.parseAsync(validRequest)).rejects.toEqual(
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
    jest.mocked(getNftByIndex).mockImplementation((index: NftIndex) => {
      if (index.tokenId === erc721Nft.tokenId) {
        return Promise.resolve(assoc('type', TokenType.Erc1155, erc721Nft))
      }
      if (index.tokenId === erc1155Nft.tokenId) {
        return Promise.resolve(erc1155Nft)
      }
      return Promise.resolve(undefined)
    })
    const schema = await createListingRequestTransformSchema(creatorUsername)
    await expect(schema.parseAsync(validRequest)).rejects.toEqual(
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
    jest.mocked(getErc1155TokenBalance).mockResolvedValue(erc1155ItemQuantity - 1)
    const schema = await createListingRequestTransformSchema(creatorUsername)
    await expect(schema.parseAsync(validRequest)).rejects.toEqual(
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
    jest.mocked(getNftByIndex).mockImplementation((index: NftIndex) => {
      if (index.tokenId === erc721Nft.tokenId) {
        return Promise.resolve(assocPath(['collection', 'contract', 'chain'], 'other-chain', erc721Nft))
      }
      if (index.tokenId === erc1155Nft.tokenId) {
        return Promise.resolve(erc1155Nft)
      }
      return Promise.resolve(undefined)
    })
    const schema = await createListingRequestTransformSchema(creatorUsername)
    await expect(schema.parseAsync(validRequest)).rejects.toEqual(
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
    const schema = await createListingRequestTransformSchema(creatorUsername)
    jest
      .mocked(getListingBySignature)
      .mockResolvedValueOnce(assoc('items', [expectedErc721Item, expectedErc1155Item], listingMock))
    await expect(schema.parseAsync(validRequest)).rejects.toEqual(
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
    await expect(createListingRequestTransformSchema(creatorUsername)).rejects.toBeInstanceOf(UnauthorizedError)
  })

  it('valid', async () => {
    const schema = await createListingRequestTransformSchema(creatorUsername)
    const expectedValue: ExpectedReturn = {
      creator,
      expiration,
      items: [expectedErc721Item, expectedErc1155Item],
      target: expectedTarget
    }
    const parsedValue = await schema.parseAsync(validRequest)
    expect(parsedValue).toStrictEqual(expectedValue)
  })
})
