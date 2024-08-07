import type { ERC20Token } from '@echo/model/types/erc20-token'
import type { OwnedERC20Token } from '@echo/model/types/owned-erc20-token'
import type { Wallet } from '@echo/model/types/wallet'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { addERC20TokenBalance, type AddErc20TokenBalanceArgs } from '@echo/web3-dom/helpers/add-erc20-token-balance'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { getViemChainById } from '@echo/web3/helpers/chain/get-viem-chain-by-id'
import { assoc, map, objOf, pipe } from 'ramda'

export interface GetAllTokensBalanceArgs {
  wallet: Wallet
  tokens: ERC20Token[]
}

export async function getAllTokensBalance(args: GetAllTokensBalanceArgs): Promise<OwnedERC20Token[]> {
  const { wallet, tokens } = args
  const { chain } = wallet
  const chainId = getChainId(chain)
  const client = pipe(getViemChainById, getWalletClient)(chainId)

  return pipe(
    map(
      pipe<
        [ERC20Token],
        Record<'token', ERC20Token>,
        Omit<AddErc20TokenBalanceArgs, 'client'>,
        AddErc20TokenBalanceArgs,
        Promise<OwnedERC20Token>
      >(objOf('token'), assoc('wallet', wallet), assoc('client', client), addERC20TokenBalance)
    ),
    promiseAll
  )(tokens)
}
