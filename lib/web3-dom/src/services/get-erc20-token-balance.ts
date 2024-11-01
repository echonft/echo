import type { Erc20Token } from '@echo/model/types/erc20-token'
import type { TokenBalance } from '@echo/model/types/token-balance'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getAccount } from '@echo/web3-dom/services/get-account'
import { backOff } from 'exponential-backoff'
import { erc20Abi, formatUnits } from 'viem'
import { readContract } from 'wagmi/actions'

export async function getErc20TokenBalance(token: Erc20Token): Promise<TokenBalance<Erc20Token>> {
  const { address } = getAccount()

  if (isNilOrEmpty(address)) {
    return { token, balance: 0 }
  }

  const balance = await backOff(
    () =>
      readContract(wagmiConfig, {
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
