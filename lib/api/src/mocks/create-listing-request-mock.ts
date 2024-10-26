import type { CreateListingRequest } from '@echo/api/types/requests/create-listing-request'
import type { Erc1155ItemRequest } from '@echo/api/types/requests/erc1155-item-request'
import type { Erc721ItemRequest } from '@echo/api/types/requests/erc721-item-request'
import { Expiration } from '@echo/model/constants/expiration'
import { TokenType } from '@echo/model/constants/token-type'
import { collectionMockPx } from '@echo/model/mocks/collection-mock'
import { erc1155ItemMock, erc721ItemMock } from '@echo/model/mocks/item-mock'

export const createListingRequestErc721ItemMock: Erc721ItemRequest = {
  token: {
    collection: {
      slug: erc721ItemMock.token.collection.slug
    },
    tokenId: erc721ItemMock.token.tokenId,
    type: TokenType.Erc721
  }
}

export const createListingRequestErc1155ItemMock: Erc1155ItemRequest = {
  token: {
    collection: {
      slug: erc1155ItemMock.token.collection.slug
    },
    tokenId: erc1155ItemMock.token.tokenId,
    type: TokenType.Erc1155
  },
  quantity: erc1155ItemMock.quantity
}

export const createListingRequestItemsMock: CreateListingRequest['items'] = [
  createListingRequestErc721ItemMock,
  createListingRequestErc1155ItemMock
]

export const createListingRequestTargetMock: CreateListingRequest['target'] = {
  collection: {
    slug: collectionMockPx.slug
  },
  quantity: 2
}

export const createListingRequestMock: CreateListingRequest = {
  items: createListingRequestItemsMock,
  target: createListingRequestTargetMock,
  expiration: Expiration.OneDay
}
