import type { Address } from '@echo/model/types/address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { erc721Abi } from 'viem'
import { readContract } from 'wagmi/actions'

export interface GetErc721ContractApprovalArgs {
  contract: Address
  wallet: Address
}

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, wallet } = args
  return await readContract(wagmiConfig, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address: contract,
    args: [wallet, echoAddress]
  })
}
