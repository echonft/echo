import type { Nft } from '@echo/model/types/nft'
import type { HexString } from '@echo/utils/types/hex-string'
import { applySpec, path, prop } from 'ramda'
import { erc721Abi } from 'viem'
import type { ContractFunctionParameters } from 'viem/types/contract'

interface MapNftToIsOwnerContractCallArgs {
  nft: Nft
  owner: HexString
}
export function mapNftToIsOwnerContractCall(args: MapNftToIsOwnerContractCallArgs): ContractFunctionParameters {
  return applySpec<ContractFunctionParameters>({
    address: path(['nft', 'collect', 'contract', 'address']),
    abi: erc721Abi,
    functionName: 'ownerOf',
    args: [prop('owner')]
  })(args)
}
