import type { Erc1155ItemRequest } from '@echo/api/types/requests/erc1155-item-request'
import type { Erc721ItemRequest } from '@echo/api/types/requests/erc721-item-request'
import type { Expiration } from '@echo/model/constants/expiration'
import type { CollectionIndex } from '@echo/model/types/collection/collection'
import type { Strict } from '@echo/utils/types/strict'

export interface CreateListingRequest {
  readonly expiration: Expiration
  readonly items: (Erc721ItemRequest | Erc1155ItemRequest)[]
  readonly target: {
    readonly collection: Strict<CollectionIndex, CollectionIndex>
    readonly quantity: number
  }
}
