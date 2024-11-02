import type { EvmAddress } from '@echo/model/types/address'
import type { Erc1155Token, Erc20Token } from '@echo/model/types/token'
import { getClient } from '@echo/web3/helpers/get-client'
import { backOff } from 'exponential-backoff'
import { erc20Abi } from 'viem'
import { readContract } from 'viem/actions'

interface GetTokenBalanceArgs {
  owner: EvmAddress
  token: Erc20Token | Erc1155Token
}

export async function getTokenBalance({ owner, token }: GetTokenBalanceArgs): Promise<number> {
  const client = await getClient(token.contract.chain)

  const balance = await backOff(
    () =>
      readContract(client, {
        abi: erc20Abi, // ERC1155 balanceOf is indentical to ERC20's one
        functionName: 'balanceOf',
        address: token.contract.address,
        args: [owner]
      }),
    { startingDelay: 1100 }
  )
  try {
    return Number(balance)
  } catch (_err) {
    return 0
  }
}
