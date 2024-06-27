import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { getClientForChain } from '@echo/web3/helpers/chain/get-client-for-chain'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { readContract } from 'viem/actions'

export interface GetEchoOfferArgs {
  chain: ChainName
  offerId: HexString
}

export async function getEchoOffer(args: GetEchoOfferArgs) {
  const { chain, offerId } = args
  const echoAddress = getEchoAddress(chain)
  const client = await getClientForChain(chain)
  return await readContract(client, {
    abi: echoAbi,
    functionName: 'offers',
    address: echoAddress,
    args: [offerId]
  })
}
