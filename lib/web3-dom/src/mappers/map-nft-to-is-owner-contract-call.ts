import type { Nft } from '@echo/model/types/nft/nft'
import { always, applySpec, path, prop } from 'ramda'
import { type ContractFunctionParameters, erc721Abi } from 'viem'

export function mapNftToIsOwnerContractCall(nft: Nft): ContractFunctionParameters {
  return applySpec<ContractFunctionParameters>({
    address: path(['collection', 'contract', 'address']),
    abi: always(erc721Abi),
    functionName: always('ownerOf'),
    args: [prop('tokenId')]
  })(nft)
}
