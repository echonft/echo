import type { Chain } from '@echo/model/constants/chain'
import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { HexString } from '@echo/utils/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export interface RedeemOfferArgs {
  offerId: Lowercase<HexString>
  chain: Chain
}

export async function redeemOffer(args: RedeemOfferArgs) {
  const { offerId, chain } = args
  const address = echoAddress(chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'redeemOffer',
    address,
    chainId: chainId(chain),
    args: [offerId]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}
