import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { echoAddressByChain } from '@echo/web3/constants/echo-address'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import type { ApproveErc721ContractArgs } from '@echo/web3-dom/types/approve-erc-721-contract-args'
import { erc721Abi } from 'viem'
import { simulateContract, waitForTransactionReceipt, writeContract } from 'wagmi/actions'

export async function approveErc721Contract(args: ApproveErc721ContractArgs) {
  const { contract } = args
  const echoAddress = echoAddressByChain(contract.chain)
  const chainId = getChainId(contract.chain)
  const { request } = await simulateContract(wagmiConfig, {
    abi: erc721Abi,
    functionName: 'setApprovalForAll',
    address: formatAddress(contract),
    chainId,
    args: [echoAddress, true]
  })
  const hash = await writeContract(wagmiConfig, request)
  await waitForTransactionReceipt(wagmiConfig, { hash })
  return hash
}
