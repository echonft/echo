import type { Offer } from '@echo/model/types/offer'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function redeemOffer(offerId: Offer['idContract']) {
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'redeemOffer',
    address: echoAddress,
    args: [offerId]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}
