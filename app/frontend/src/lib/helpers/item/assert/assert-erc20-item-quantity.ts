import { ItemError } from '@echo/model/constants/errors/item-error'
import type { Item } from '@echo/model/types/item'
import type { Erc20Token } from '@echo/model/types/token'
import type { Wallet } from '@echo/model/types/wallet'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { getErc20TokenBalance } from '@echo/web3/services/get-erc20-token-balance'

interface AssertErc20ItemQuantityArgs {
  item: Item<Erc20Token>
  owner: Wallet
}

export async function assertErc20ItemQuantity(args: WithLoggerType<AssertErc20ItemQuantityArgs>) {
  const { item, owner, logger } = args
  if (item.quantity <= 0) {
    logger?.error({ item, owner }, 'ERC20 token item quantity must be positive')
    return Promise.reject(Error(ItemError.Quantity))
  }
  const balance = await getErc20TokenBalance({ token: item.token, wallet: owner })
  if (item.quantity > balance) {
    logger?.error({ item, owner, balance }, "ERC20 token item quantity is greater than the owner's balance")
    return Promise.reject(Error(ItemError.Quantity))
  }
}
