import type { Nft } from '@echo/model/types/nft'
import { mapNftToIsOwnerContractCall } from '@echo/web3-dom/mappers/map-nft-to-is-owner-contract-call'
import { map } from 'ramda'
import type { ContractFunctionParameters } from 'viem/types/contract'

export function mapNftsToIsOwnerContractCalls(nfts: Nft[]): ContractFunctionParameters[] {
  return map(mapNftToIsOwnerContractCall)(nfts)
}
