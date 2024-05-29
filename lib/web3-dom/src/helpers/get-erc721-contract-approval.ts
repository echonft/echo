import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc-721-contract-approval-args'
import { pipe } from 'ramda'
import { erc721Abi } from 'viem'
import { readContract } from 'viem/actions'

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, owner } = args
  const address = formatWalletAddress(contract)
  const echoAddress = getEchoAddressByChain(contract.chain)
  const chainId = getChainId(contract.chain)
  const client = pipe(getChainById, getWalletClient)(chainId)
  return await readContract(client, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address,
    args: [owner, echoAddress]
  })
}
