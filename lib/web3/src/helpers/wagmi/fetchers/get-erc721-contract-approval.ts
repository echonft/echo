import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { erc721FunctionNames } from '@echo/web3/constants/erc721-function-names'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import { readContract } from '@wagmi/core'

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, owner } = args
  const address = formatAddress(contract)
  const { chainId } = contract
  return await readContract({
    abi: erc721ABI,
    functionName: erc721FunctionNames.isApprovedForAll,
    address,
    chainId,
    args: [owner, address]
  })
}
