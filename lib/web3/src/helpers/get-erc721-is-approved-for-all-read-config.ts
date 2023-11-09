import type { Contract } from '@echo/model/types/contract'
import type { HexString } from '@echo/utils/types/hex-string'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { IS_APPROVED_FOR_ALL } from '@echo/web3/constants/erc721-function-names'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import type { IsApprovedForAllFn } from '@echo/web3/types/erc721-function-name-types'
import type { UseContractReadConfig } from 'wagmi'

export function getErc721IsApprovedForAllReadConfig(contract: Contract, ownerAddress: HexString, watch?: boolean) {
  const { address, chainId } = contract
  return {
    abi: erc721ABI,
    functionName: IS_APPROVED_FOR_ALL,
    address,
    chainId,
    args: [ownerAddress, getEchoAddress(chainId)],
    watch
  } as UseContractReadConfig<typeof erc721ABI, IsApprovedForAllFn>
}
