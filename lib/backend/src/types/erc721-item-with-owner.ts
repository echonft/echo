import type { Erc721Item } from '@echo/model/types/item/erc721-item'
import type { User } from '@echo/model/types/user/user'

export interface Erc721ItemWithOwner extends Erc721Item {
  owner: User
}
