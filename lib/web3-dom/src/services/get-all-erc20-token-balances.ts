import type { Contract } from '@echo/model/types/contract'
import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/helpers/non-empty-promise-all'
import { walletClient } from '@echo/web3-dom/helpers/wallet-client'
import { getErc20TokenBalance, type GetErc20TokenBalanceArgs } from '@echo/web3-dom/services/get-erc20-token-balance'
import { assoc, type NonEmptyArray, objOf, pipe } from 'ramda'

export interface GetAllTokensBalanceArgs {
  contract: Contract
  tokens: NonEmptyArray<Erc20Token>
}

export function getAllErc20TokenBalances({
  contract: { chain },
  tokens
}: GetAllTokensBalanceArgs): Promise<NonEmptyArray<TokenBalance<Erc20Token>>> {
  const client = walletClient(chain)
  return pipe(
    nonEmptyMap(
      pipe<[Erc20Token], Record<'token', Erc20Token>, GetErc20TokenBalanceArgs, Promise<TokenBalance<Erc20Token>>>(
        objOf('token'),
        assoc('client', client),
        getErc20TokenBalance
      )
    ),
    nonEmptyPromiseAll
  )(tokens)
}
