import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getPublicViemClient } from '@echo/web3/helpers/viem/get-public-viem-client'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import { pipe } from 'ramda'
import { erc721Abi } from 'viem'
import { readContract } from 'viem/actions'

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, owner } = args
  const address = formatAddress(contract)
  const { chainId } = contract
  const client = pipe(getChainById, getPublicViemClient)(chainId)
  return await readContract(client, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address,
    args: [owner, getEchoAddress()]
  })
}
