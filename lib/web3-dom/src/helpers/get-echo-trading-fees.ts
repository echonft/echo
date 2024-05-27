import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { ECHO_ABI } from '@echo/web3/constants/echo-abi'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { pipe } from 'ramda'
import { readContract } from 'viem/actions'

interface GetEchoTradingFeesArgs {
  chain: ChainName
}

export async function getEchoTradingFees(args: GetEchoTradingFeesArgs): Promise<bigint> {
  const { chain } = args
  const echoAddress = getEchoAddressByChain(chain)
  const chainId = getChainId(chain)
  const client = pipe(getChainById, getWalletClient)(chainId)
  return await readContract(client, {
    abi: ECHO_ABI,
    functionName: 'tradingFee',
    address: echoAddress
  })
}
