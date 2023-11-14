import { type Contract } from '@echo/model/types/contract'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { erc721FunctionNames } from '@echo/web3/constants/erc721-function-names'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { prepareWriteContract, writeContract } from '@wagmi/core'

export interface ApproveErc721ContractArgs {
  contract: Contract
}
export async function approveErc721Contract(args: ApproveErc721ContractArgs) {
  const {
    contract: { chainId, address }
  } = args
  const config = await prepareWriteContract({
    abi: erc721ABI,
    functionName: erc721FunctionNames.setApprovalForAll,
    address,
    chainId,
    args: [getEchoAddress(chainId), true]
  })
  const { hash } = await writeContract(config)
  return hash
}
