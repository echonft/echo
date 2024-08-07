import type { ERC20Token } from '@echo/model/types/erc20-token'
import type { OwnedERC20Token } from '@echo/model/types/owned-erc20-token'
import { toPromise } from '@echo/utils/fp/to-promise'
import { delayPromise } from '@echo/utils/helpers/delay-promise'
import type { GetAllTokensBalanceArgs } from '@echo/web3-dom/helpers/get-all-tokens-balance'
import { assoc, map, pipe } from 'ramda'

function addTokenBalance(token: ERC20Token): OwnedERC20Token {
  switch (token.contract) {
    case '0x4300000000000000000000000000000000000004':
      return assoc('balance', 0.987654, token)
    case '0x4300000000000000000000000000000000000003':
      return assoc('balance', 1234.56789, token)
    default:
      return assoc('balance', 0.987654, token)
  }
}

export async function getAllTokensBalance(args: GetAllTokensBalanceArgs): Promise<OwnedERC20Token[]> {
  return delayPromise(pipe(map(addTokenBalance), toPromise), 800)(args.tokens)
}
