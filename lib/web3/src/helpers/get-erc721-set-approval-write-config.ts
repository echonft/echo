import type { Contract } from '@echo/model/types/contract'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { SET_APPROVAL_FOR_ALL } from '@echo/web3/constants/erc721-function-names'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import type { SetApprovalForAllFn } from '@echo/web3/types/erc721-function-name-types'
import type { UsePrepareContractWriteConfig } from 'wagmi'

export function getErc721SetApprovalWriteConfig(contract: Contract) {
  const { address, chainId } = contract
  return {
    abi: erc721ABI,
    functionName: SET_APPROVAL_FOR_ALL,
    address,
    chainId,
    args: [getEchoAddress(chainId), true]
  } as UsePrepareContractWriteConfig<typeof erc721ABI, SetApprovalForAllFn, number>
}
