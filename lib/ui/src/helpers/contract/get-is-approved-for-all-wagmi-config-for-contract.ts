import type { Contract } from '@echo/model/types/contract'
import { getContractAbiForTokenType } from '@echo/ui/helpers/contract/get-contract-abi-for-token-type'
import { getContractIsApprovedForTokenType } from '@echo/ui/helpers/contract/get-contract-is-approved-for-token-type'
import { echoAddress } from '@echo/utils/constants/echo-address'
import type { ContractFunctionConfig } from 'viem/types/contract'

export function getIsApprovedForAllWagmiConfigForContract(
  contract: Contract,
  ownerAddress: string
): ContractFunctionConfig {
  return {
    abi: getContractAbiForTokenType(contract.tokenType),
    functionName: getContractIsApprovedForTokenType(contract.tokenType),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    address: contract.address,
    chainId: contract.chainId,
    args: [ownerAddress, echoAddress]
  }
}
