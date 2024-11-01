import type { Chain } from '@echo/model/constants/chain'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { readContract } from 'wagmi/actions'

export interface GetEchoTradingFeesArgs {
  chain: Chain
}

export async function getEchoTradingFees(args: GetEchoTradingFeesArgs): Promise<bigint> {
  const { chain } = args
  return await readContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'tradingFee',
    address: echoAddress(chain)
  })
}
