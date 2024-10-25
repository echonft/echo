import { chainId } from '@echo/model/helpers/chain/chain-id'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc721-contract-args'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { erc721Abi } from 'viem'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function approveErc721Contract(args: ApproveErc721ContractArgs) {
  const { contract } = args
  const echoAddress = getEchoAddress(contract.chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: erc721Abi,
    functionName: 'setApprovalForAll',
    address: formatWalletAddress(contract),
    chainId: chainId(contract.chain),
    args: [echoAddress, true]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}
