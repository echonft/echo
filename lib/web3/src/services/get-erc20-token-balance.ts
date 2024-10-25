import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { Wallet } from '@echo/model/types/wallet'
import { getClient } from '@echo/web3/helpers/get-client'
import { backOff } from 'exponential-backoff'
import { erc20Abi, formatUnits } from 'viem'
import { readContract } from 'viem/actions'

interface GetErc20TokenBalanceArgs {
  token: Pick<Erc20Token, 'contract' | 'decimals'>
  wallet: Wallet
}

export async function getErc20TokenBalance(args: GetErc20TokenBalanceArgs): Promise<number> {
  const {
    token,
    wallet: { address, chain }
  } = args
  const client = await getClient(chain)

  const balance = await backOff(
    () =>
      readContract(client, {
        abi: erc20Abi,
        functionName: 'balanceOf',
        address: token.contract.address,
        args: [address]
      }),
    { startingDelay: 1100 }
  )
  try {
    return Number(formatUnits(balance, token.decimals))
  } catch (_err) {
    return 0
  }
}
