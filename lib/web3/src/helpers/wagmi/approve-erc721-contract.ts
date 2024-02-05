import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { erc721FunctionNames } from '@echo/web3/constants/erc721-function-names'
import { wagmiConfig } from '@echo/web3/constants/wagmi-config'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function approveErc721Contract(args: ApproveErc721ContractArgs) {
  const { contract } = args
  const { chainId } = contract
  const { request } = await simulateContract(wagmiConfig, {
    abi: erc721ABI,
    functionName: erc721FunctionNames.setApprovalForAll,
    address: formatAddress(contract),
    chainId,
    args: [getEchoAddress(chainId), true]
  })
  return await writeContract(wagmiConfig, request)
}
