import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'
import type { Wallet } from '@echo/model/types/wallet'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/fp/non-empty-promise-all'
import { getErc20TokenBalance, type GetErc20TokenBalanceArgs } from '@echo/web3-dom/helpers/get-erc20-token-balance'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { assoc, type NonEmptyArray, objOf, pipe } from 'ramda'

export interface GetAllTokensBalanceArgs {
  wallet: Wallet
  tokens: NonEmptyArray<Erc20Token>
}

export function getAllErc20TokenBalances(
  args: GetAllTokensBalanceArgs
): Promise<NonEmptyArray<TokenBalance<Erc20Token>>> {
  const { wallet, tokens } = args
  const { chain } = wallet
  const client = getWalletClient(chain)
  return pipe(
    nonEmptyMap(
      pipe<
        [Erc20Token],
        Record<'token', Erc20Token>,
        Omit<GetErc20TokenBalanceArgs, 'client'>,
        GetErc20TokenBalanceArgs,
        Promise<TokenBalance<Erc20Token>>
      >(objOf('token'), assoc('wallet', wallet), assoc('client', client), getErc20TokenBalance)
    ),
    nonEmptyPromiseAll
  )(tokens)
}
