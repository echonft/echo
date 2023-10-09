import { getContractAbiForOfferItem } from '@echo/ui/helpers/contract/get-contract-abi-for-offer-item'
import { getContractOwnerOfForOfferItem } from '@echo/ui/helpers/contract/get-contract-owner-of-for-offer-item'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { ContractFunctionConfig } from 'viem/types/contract'

export function getWagmiOwnerOfContractConfigForOfferItem(offerItem: OfferItem): ContractFunctionConfig {
  return {
    abi: getContractAbiForOfferItem(offerItem),
    functionName: getContractOwnerOfForOfferItem(offerItem),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    address: offerItem.nft.collection.contract.address,
    chainId: offerItem.nft.collection.contract.chainId,
    args: [offerItem.nft.tokenId]
  }
}
