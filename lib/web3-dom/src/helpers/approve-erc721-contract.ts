import { echoAddress } from '@echo/web3/constants/echo-address'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc-721-contract-args'
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
