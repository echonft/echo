import { echoAddress } from '@echo/web3/constants/echo-address'
import { wagmiConfig } from '@echo/web3/constants/wagmi-config'
import { formatAddress } from '@echo/web3/helpers/format-address'
import type { ApproveErc721ContractArgs } from '@echo/web3/types/approve-erc-721-contract-args'
import { erc721Abi } from 'viem'
import { simulateContract, writeContract } from 'wagmi/actions'

export async function approveErc721Contract(args: ApproveErc721ContractArgs) {
  const { contract } = args
  const { chainId } = contract
  const { request } = await simulateContract(wagmiConfig, {
    abi: erc721Abi,
    functionName: 'setApprovalForAll',
    address: formatAddress(contract),
    chainId,
    args: [echoAddress, true]
  })
  return writeContract(wagmiConfig, request)
}
