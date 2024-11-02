import type { Erc20Token, TokenBalance } from '@echo/model/types/token'
import { nonEmptyMap } from '@echo/utils/helpers/non-empty-map'
import { nonEmptyPromiseAll } from '@echo/utils/helpers/non-empty-promise-all'
import { getErc20TokenBalance } from '@echo/web3-dom/services/get-erc20-token-balance'
import { type NonEmptyArray, pipe } from 'ramda'

export function getAllErc20TokenBalances(
  tokens: NonEmptyArray<Erc20Token>
): Promise<NonEmptyArray<TokenBalance<Erc20Token>>> {
  return pipe(nonEmptyMap(getErc20TokenBalance), nonEmptyPromiseAll)(tokens)
}
