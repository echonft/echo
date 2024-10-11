import type { Erc20Token, Erc20TokenBalance } from '@echo/model/types/token'
import { nonEmptyArrayMap } from '@echo/utils/fp/non-empty-array-map'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetAllTokensBalanceArgs } from '@echo/web3-dom/helpers/get-all-tokens-balance'
import { applySpec, identity, type NonEmptyArray, pipe } from 'ramda'

function getTokenBalance(token: Erc20Token): number {
  switch (token.name) {
    case 'WETH':
      return 0.987654
    case 'USDB':
      return 1234.56789
    case 'USDC':
      return 2000
    default:
      return 987654
  }
}

export async function getAllTokensBalance(args: GetAllTokensBalanceArgs): Promise<NonEmptyArray<Erc20TokenBalance>> {
  return delayPromise(
    pipe(
      nonEmptyArrayMap(
        applySpec<Erc20TokenBalance>({
          token: identity,
          balance: getTokenBalance
        })
      ),
      toPromise
    ),
    800
  )(args.tokens)
}
