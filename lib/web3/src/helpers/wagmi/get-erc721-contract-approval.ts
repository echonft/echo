import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { erc721FunctionNames } from '@echo/web3/constants/erc721-function-names'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getPublicViemClient } from '@echo/web3/helpers/viem/get-public-viem-client'
import type { GetErc721ContractApprovalArgs } from '@echo/web3/types/get-erc-721-contract-approval-args'
import { pipe } from 'ramda'
import { readContract } from 'viem/actions'

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, owner } = args
  const address = formatAddress(contract)
  const { chainId } = contract
  const client = pipe(getChainById, getPublicViemClient)(chainId)
  return await readContract(client, {
    abi: erc721ABI,
    functionName: erc721FunctionNames.isApprovedForAll,
    address,
    args: [owner, address]
  })
}
