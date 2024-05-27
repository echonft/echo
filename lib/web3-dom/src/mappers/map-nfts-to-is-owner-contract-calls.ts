import type { Nft } from '@echo/model/types/nft'
import type { HexString } from '@echo/utils/types/hex-string'
import { mapNftToIsOwnerContractCall } from '@echo/web3-dom/mappers/map-nft-to-is-owner-contract-call'
import { always, applySpec, map, pipe } from 'ramda'
import type { ContractFunctionParameters } from 'viem/types/contract'

interface MapNftsToIsOwnerContractCallsArgs {
  nfts: Nft[]
  owner: HexString
}
export function mapNftsToIsOwnerContractCalls(args: MapNftsToIsOwnerContractCallsArgs): ContractFunctionParameters[] {
  return map(pipe(applySpec({ nft: always, owner: args.owner }), mapNftToIsOwnerContractCall), args.nfts)
}
