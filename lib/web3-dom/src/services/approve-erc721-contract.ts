import { chainId } from '@echo/model/helpers/chain/chain-id'
import type { Contract } from '@echo/model/types/contract'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { erc721Abi } from 'viem'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export interface ApproveErc721ContractArgs {
  contract: Contract
}

export async function approveErc721Contract(args: ApproveErc721ContractArgs) {
  const { contract } = args
  const echoAddress = getEchoAddress(contract.chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: erc721Abi,
    functionName: 'setApprovalForAll',
    address: contract.address,
    chainId: chainId(contract.chain),
    args: [echoAddress, true]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}
