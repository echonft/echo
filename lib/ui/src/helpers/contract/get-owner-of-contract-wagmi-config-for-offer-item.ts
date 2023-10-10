import { getContractAbiForTokenType } from '@echo/ui/helpers/contract/get-contract-abi-for-token-type'
import { getContractOwnerOfForTokenType } from '@echo/ui/helpers/contract/get-contract-owner-of-for-token-type'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { ContractFunctionConfig } from 'viem/types/contract'

export function getOwnerOfContractWagmiConfigForOfferItem(offerItem: OfferItem): ContractFunctionConfig {
  return {
    abi: getContractAbiForTokenType(offerItem.nft.tokenType),
    functionName: getContractOwnerOfForTokenType(offerItem.nft.tokenType),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    address: offerItem.nft.collection.contract.address,
    chainId: offerItem.nft.collection.contract.chainId,
    args: [offerItem.nft.tokenId]
  }
}
