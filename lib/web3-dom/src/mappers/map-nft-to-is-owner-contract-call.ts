import type { Nft } from '@echo/model/types/nft'
import { always, applySpec, path, prop } from 'ramda'
import { erc721Abi } from 'viem'
import type { ContractFunctionParameters } from 'viem/types/contract'

export function mapNftToIsOwnerContractCall(nft: Nft): ContractFunctionParameters {
  return applySpec<ContractFunctionParameters>({
    address: path(['collection', 'contract', 'address']),
    abi: always(erc721Abi),
    functionName: always('ownerOf'),
    args: [prop('tokenId')]
  })(nft)
}
