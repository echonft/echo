import { type Contract } from '@echo/model/types/contract'
import type { HexString } from '@echo/utils/types/hex-string'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { erc721FunctionNames } from '@echo/web3/constants/erc721-function-names'
import { readContracts } from '@wagmi/core'
import { map } from 'ramda'

export interface GetErc721ContractsApprovalsArgs {
  contracts: Contract[]
  owner: HexString
}
export async function getErc721ContractsApprovals(args: GetErc721ContractsApprovalsArgs) {
  const { contracts, owner } = args
  return await readContracts({
    contracts: map(
      ({ address, chainId }) => ({
        abi: erc721ABI,
        functionName: erc721FunctionNames.isApprovedForAll,
        address,
        chainId,
        args: [owner, address]
      }),
      contracts
    ),
    allowFailure: false
  })
}
