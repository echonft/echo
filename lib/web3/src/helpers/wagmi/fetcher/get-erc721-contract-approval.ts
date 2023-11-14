import { type Contract } from '@echo/model/types/contract'
import type { HexString } from '@echo/utils/types/hex-string'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { erc721FunctionNames } from '@echo/web3/constants/erc721-function-names'
import { readContract } from '@wagmi/core'

export interface GetErc721ContractApprovalArgs {
  contract: Contract
  owner: HexString
}
export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const {
    contract: { address, chainId },
    owner
  } = args
  return await readContract({
    abi: erc721ABI,
    functionName: erc721FunctionNames.isApprovedForAll,
    address,
    chainId,
    args: [owner, address]
  })
}
