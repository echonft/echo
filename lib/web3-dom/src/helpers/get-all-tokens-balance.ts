import type { Erc20Token, Erc20TokenBalance } from '@echo/model/types/token'
import type { Wallet } from '@echo/model/types/wallet'
import { nonEmptyArrayMap } from '@echo/utils/fp/non-empty-array-map'
import { nonEmptyPromiseAll } from '@echo/utils/fp/non-empty-promise-all'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { getErc20TokenBalance, type GetErc20TokenBalanceArgs } from '@echo/web3-dom/helpers/get-erc20-token-balance'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { getViemChainById } from '@echo/web3/helpers/get-viem-chain-by-id'
import { assoc, type NonEmptyArray, objOf, pipe } from 'ramda'

export interface GetAllTokensBalanceArgs {
  wallet: Wallet
  tokens: NonEmptyArray<Erc20Token>
}

export async function getAllTokensBalance(args: GetAllTokensBalanceArgs): Promise<NonEmptyArray<Erc20TokenBalance>> {
  const { wallet, tokens } = args
  const { chain } = wallet
  const chainId = getChainId(chain)
  const client = pipe(getViemChainById, getWalletClient)(chainId)
  return pipe(
    nonEmptyArrayMap(
      pipe<
        [Erc20Token],
        Record<'token', Erc20Token>,
        Omit<GetErc20TokenBalanceArgs, 'client'>,
        GetErc20TokenBalanceArgs,
        Promise<Erc20TokenBalance>
      >(objOf('token'), assoc('wallet', wallet), assoc('client', client), getErc20TokenBalance)
    ),
    nonEmptyPromiseAll
  )(tokens)
}
