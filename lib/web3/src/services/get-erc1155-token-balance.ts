import type { Erc1155Token } from '@echo/model/types/token/erc1155-token'
import type { Wallet } from '@echo/model/types/wallet'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { backOff } from 'exponential-backoff'
import { erc20Abi } from 'viem'
import { readContract } from 'viem/actions'

interface GetErc1155TokenBalanceArgs {
  token: Erc1155Token
  wallet: Wallet
}

export async function getErc1155TokenBalance(args: GetErc1155TokenBalanceArgs): Promise<number> {
  const {
    token,
    wallet: { address, chain }
  } = args
  const client = await getClientForChain(chain)

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
