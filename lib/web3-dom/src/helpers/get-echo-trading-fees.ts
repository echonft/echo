import type { Chain } from '@echo/model/constants/chain'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { readContract } from 'viem/actions'

export interface GetEchoTradingFeesArgs {
  chain: Chain
}

export async function getEchoTradingFees(args: GetEchoTradingFeesArgs): Promise<bigint> {
  const { chain } = args
  const echoAddress = getEchoAddress(chain)
  const client = getWalletClient(chain)
  return await readContract(client, {
    abi: echoAbi,
    functionName: 'tradingFee',
    address: echoAddress
  })
}
