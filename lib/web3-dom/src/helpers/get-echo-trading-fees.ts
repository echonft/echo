import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemChainById } from '@echo/web3/helpers/get-viem-chain-by-id'
import { pipe } from 'ramda'
import { readContract } from 'viem/actions'

export interface GetEchoTradingFeesArgs {
  chain: ChainName
}

export async function getEchoTradingFees(args: GetEchoTradingFeesArgs): Promise<bigint> {
  const { chain } = args
  const echoAddress = getEchoAddress(chain)
  const chainId = getChainId(chain)
  const client = pipe(getViemChainById, getWalletClient)(chainId)
  return await readContract(client, {
    abi: echoAbi,
    functionName: 'tradingFee',
    address: echoAddress
  })
}
