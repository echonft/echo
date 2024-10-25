import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import type { GetErc721ContractApprovalArgs } from '@echo/web3-dom/types/get-erc721-contract-approval-args'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { pipe, prop } from 'ramda'
import { erc721Abi } from 'viem'
import { readContract } from 'viem/actions'

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, owner } = args
  const address = formatWalletAddress(contract)
  const echoAddress = getEchoAddress(contract.chain)
  const client = pipe(prop('chain'), getWalletClient)(contract)
  return await readContract(client, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address,
    args: [owner, echoAddress]
  })
}
