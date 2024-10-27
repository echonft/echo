import type { Chain } from '@echo/model/constants/chain'
import { walletClient } from '@echo/web3-dom/helpers/wallet-client'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { readContract } from 'viem/actions'

export interface GetEchoTradingFeesArgs {
  chain: Chain
}

export async function getEchoTradingFees(args: GetEchoTradingFeesArgs): Promise<bigint> {
  const { chain } = args
  const client = walletClient(chain)
  return await readContract(client, {
    abi: echoAbi,
    functionName: 'tradingFee',
    address: echoAddress(chain)
  })
}
