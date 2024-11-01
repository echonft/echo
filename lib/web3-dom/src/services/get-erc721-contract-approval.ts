import type { EvmAddress } from '@echo/model/types/address'
import type { Contract } from '@echo/model/types/contract'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { erc721Abi } from 'viem'
import { readContract } from 'wagmi/actions'

export interface GetErc721ContractApprovalArgs {
  contract: Contract
  address: EvmAddress
}

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, address } = args
  return await readContract(wagmiConfig, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address: contract.address,
    args: [address, echoAddress(contract.chain)]
  })
}
