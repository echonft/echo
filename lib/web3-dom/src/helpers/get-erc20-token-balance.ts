import type { Erc20Token, Erc20TokenBalance } from '@echo/model/types/token'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { backOff } from 'exponential-backoff'
import { erc20Abi, formatUnits, type WalletClient } from 'viem'
import { readContract } from 'viem/actions'

export interface GetErc20TokenBalanceArgs {
  client: WalletClient
  token: Erc20Token
}

export async function getErc20TokenBalance(args: GetErc20TokenBalanceArgs): Promise<Erc20TokenBalance> {
  const { token, client } = args
  const address = client.account?.address

  if (isNilOrEmpty(address)) {
    return { token, balance: 0 }
  }

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
    return { token, balance: Number(formatUnits(balance, token.decimals)) }
  } catch (_err) {
    return { token, balance: 0 }
  }
}
