import { ItemError } from '@echo/model/constants/errors/item-error'
import type { Erc1155Item } from '@echo/model/types/item/erc1155-item'
import type { Wallet } from '@echo/model/types/wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getErc1155TokenBalance } from '@echo/web3/services/get-erc1155-token-balance'
import { util } from 'zod'

interface AssertErc1155ItemQuantityArgs {
  item: Erc1155Item
  owner: Wallet
}

export async function assertErc1155ItemQuantity(args: WithLoggerType<AssertErc1155ItemQuantityArgs>) {
  const { item, owner, logger } = args
  if (item.quantity <= 0) {
    logger?.error({ item, owner }, 'ERC1155 token item quantity must be positive')
    return Promise.reject(Error(ItemError.Quantity))
  }
  if (!util.isInteger(item.quantity)) {
    logger?.error({ item, owner }, 'ERC1155 token item quantity must be an integer')
    return Promise.reject(Error(ItemError.Quantity))
  }
  const balance = await getErc1155TokenBalance({ token: item.token, wallet: owner })
  if (item.quantity > balance) {
    logger?.error({ item, owner, balance }, "ERC1155 token item quantity is greater than the owner's balance")
    return Promise.reject(Error(ItemError.Quantity))
  }
}
