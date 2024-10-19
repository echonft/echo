import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Erc20Item } from '@echo/model/types/item/erc20-item'
import type { Erc721Item } from '@echo/model/types/item/erc721-item'

export type Item = Erc20Item | Erc721Item | Erc1155Item
