import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { User } from '@echo/model/types/user/user'

export interface Erc1155ItemWithOwner extends Erc1155Item {
  owner: User
}
