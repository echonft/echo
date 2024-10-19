import type { Erc20Token } from '@echo/model/types/token/erc20-token'
import type { TokenBalance } from '@echo/model/types/token/token-balance'
import { getErc20TokenBalance } from '@echo/storybook/mocks/get-erc20-token-balance'
import { nonEmptyMap } from '@echo/utils/fp/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/fp/non-empty-promise-all'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetAllTokensBalanceArgs } from '@echo/web3-dom/helpers/get-all-erc20-token-balances'
import { type NonEmptyArray, pipe, prop } from 'ramda'

export async function getAllErc20TokenBalances(
  args: GetAllTokensBalanceArgs
): Promise<NonEmptyArray<TokenBalance<Erc20Token>>> {
  return delayPromise(pipe(prop('tokens'), nonEmptyMap(getErc20TokenBalance), nonEmptyPromiseAll), 800)(args)
}
