import type { Erc20Token, TokenBalance } from '@echo/model/types/token'
import { getErc20TokenBalance } from '@echo/storybook/mocks/get-erc20-token-balance'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/helpers/non-empty-promise-all'
import { rangeDelay } from 'delay'
import { type NonEmptyArray, pipe } from 'ramda'

export async function getAllErc20TokenBalances(
  tokens: NonEmptyArray<Erc20Token>
): Promise<NonEmptyArray<TokenBalance<Erc20Token>>> {
  const value = await pipe(nonEmptyMap(getErc20TokenBalance), nonEmptyPromiseAll)(tokens)
  return rangeDelay(800, 1600, { value })
}
