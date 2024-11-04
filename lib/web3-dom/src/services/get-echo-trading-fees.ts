import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { readContract } from 'wagmi/actions'

export async function getEchoTradingFees(): Promise<bigint> {
  return await readContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'tradingFee',
    address: echoAddress
  })
}
