import type { Erc1155ItemWithOwner } from '@echo/backend/types/erc1155-item-with-owner'
import type { Erc721ItemWithOwner } from '@echo/backend/types/erc721-item-with-owner'

export type NftItemWithOwner = Erc721ItemWithOwner | Erc1155ItemWithOwner
