import type { Contract } from '@echo/model/types/contract'
import { getContractAbiForTokenType } from '@echo/ui/helpers/contract/get-contract-abi-for-token-type'
import { getContractApprovalForTokenType } from '@echo/ui/helpers/contract/get-contract-approval-for-token-type'
import { echoAddress } from '@echo/utils/constants/echo-address'
import type { ContractFunctionConfig } from 'viem/types/contract'

export function getSetApprovalWagmiConfigForContract(contract: Contract): ContractFunctionConfig {
  return {
    abi: getContractAbiForTokenType(contract.tokenType),
    functionName: getContractApprovalForTokenType(contract.tokenType),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    address: contract.address,
    chainId: contract.chainId,
    args: [echoAddress, true]
  }
}
