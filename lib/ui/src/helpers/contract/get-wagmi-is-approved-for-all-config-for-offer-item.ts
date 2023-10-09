import { getContractAbiForOfferItem } from '@echo/ui/helpers/contract/get-contract-abi-for-offer-item'
import { getContractApprovalForOfferItem } from '@echo/ui/helpers/contract/get-contract-approval-for-offer-item'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { echoAddress } from '@echo/utils/constants/echo-address'
import { ContractFunctionConfig } from 'viem/types/contract'

export function getWagmiIsApprovedForAllConfigForOfferItem(
  offerItem: OfferItem,
  address: string
): ContractFunctionConfig {
  return {
    abi: getContractAbiForOfferItem(offerItem),
    functionName: getContractApprovalForOfferItem(offerItem),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    address: offerItem.nft.collection.contract.address,
    chainId: offerItem.nft.collection.contract.chainId,
    args: [address, echoAddress]
  }
}
