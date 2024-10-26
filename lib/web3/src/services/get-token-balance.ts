import { Chain } from '@echo/model/constants/chain'
import type { EvmAddress } from '@echo/model/types/address'
import type { Contract } from '@echo/model/types/contract'
import { getClient } from '@echo/web3/helpers/get-client'
import { backOff } from 'exponential-backoff'
import { erc20Abi } from 'viem'
import { readContract } from 'viem/actions'

interface GetErc1155TokenBalanceArgs {
  address: EvmAddress
  chain: Chain
  token: {
    contract: Contract
  }
}

export async function getTokenBalance({ address, chain, token }: GetErc1155TokenBalanceArgs): Promise<number> {
  const client = await getClient(chain)

  const balance = await backOff(
    () =>
      readContract(client, {
        abi: erc20Abi, // ERC1155 balanceOf is indentical to ERC20's one
        functionName: 'balanceOf',
        address: token.contract.address,
        args: [address]
      }),
    { startingDelay: 1100 }
  )
  try {
    return Number(balance)
  } catch (_err) {
    return 0
  }
}
