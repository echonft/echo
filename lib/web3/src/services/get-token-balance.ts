import type { Address } from '@echo/model/types/address'
import type { Erc1155Token, Erc20Token } from '@echo/model/types/token'
import { getClient } from '@echo/web3/helpers/get-client'
import { backOff } from 'exponential-backoff'
import { erc20Abi } from 'viem'
import { readContract } from 'viem/actions'

interface GetTokenBalanceArgs {
  token: Erc20Token | Erc1155Token
  wallet: Address
}

export async function getTokenBalance({ wallet, token }: GetTokenBalanceArgs): Promise<number> {
  const client = getClient()
  const balance = await backOff(
    () =>
      readContract(client, {
        abi: erc20Abi, // ERC1155 balanceOf is indentical to ERC20's one
        functionName: 'balanceOf',
        address: token.contract,
        args: [wallet]
      }),
    { startingDelay: 1100 }
  )
  try {
    return Number(balance)
  } catch (_err) {
    return 0
  }
}
