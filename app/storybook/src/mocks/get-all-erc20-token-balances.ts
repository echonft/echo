import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'
import { getErc20TokenBalance } from '@echo/storybook/mocks/get-erc20-token-balance'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/helpers/non-empty-promise-all'
import { type NonEmptyArray, pipe } from 'ramda'

export async function getAllErc20TokenBalances(
  tokens: NonEmptyArray<Erc20Token>
): Promise<NonEmptyArray<TokenBalance<Erc20Token>>> {
  return pipe(nonEmptyMap(getErc20TokenBalance), nonEmptyPromiseAll, delayPromise(800))(tokens)
}
