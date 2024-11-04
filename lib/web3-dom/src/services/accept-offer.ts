import type { Offer } from '@echo/model/types/offer'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getEchoTradingFees } from '@echo/web3-dom/services/get-echo-trading-fees'
import { echoAbi } from '@echo/web3/constants/echo-abi'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function acceptOffer(offerId: Offer['idContract']) {
  const tradingFees = await getEchoTradingFees()
  const { request } = await simulateContract(wagmiConfig, {
    abi: echoAbi,
    functionName: 'acceptOffer',
    address: echoAddress,
    args: [offerId],
    value: tradingFees
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}
