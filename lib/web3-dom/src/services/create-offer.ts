import type { BaseOffer } from '@echo/model/types/offer'
import type { HexString } from '@echo/model/types/hex-string'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { offerToEchoOffer } from '@echo/web3/mappers/offer-to-echo-offer'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function createOffer(offer: BaseOffer): Promise<HexString> {
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'createOffer',
    address: echoAddress,
    args: [offerToEchoOffer(offer) as never]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}
