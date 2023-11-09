import type { OfferItem } from '@echo/model/types/offer-item'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { OWNER_OF } from '@echo/web3/constants/erc721-function-names'
import type { OwnerOfFn } from '@echo/web3/types/erc721-function-name-types'
import type { UseContractReadConfig } from 'wagmi'

export function getErc721OwnerOfContractReadConfig(offerItem: OfferItem) {
  const {
    nft: {
      collection: {
        contract: { address, chainId }
      },
      tokenId
    }
  } = offerItem
  return {
    abi: erc721ABI,
    functionName: OWNER_OF,
    address,
    chainId,
    args: [tokenId as unknown as bigint]
  } as UseContractReadConfig<typeof erc721ABI, OwnerOfFn>
}
