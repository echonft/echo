import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc721-contract-approval-args'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemChainById } from '@echo/web3/helpers/get-viem-chain-by-id'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { pipe } from 'ramda'
import { erc721Abi } from 'viem'
import { readContract } from 'viem/actions'

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, owner } = args
  const address = formatWalletAddress(contract)
  const echoAddress = getEchoAddress(contract.chain)
  const chainId = getChainId(contract.chain)
  const client = pipe(getViemChainById, getWalletClient)(chainId)
  return await readContract(client, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address,
    args: [owner, echoAddress]
  })
}
