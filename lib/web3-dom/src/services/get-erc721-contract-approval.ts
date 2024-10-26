import type { Contract } from '@echo/model/types/contract'
import type { HexString } from '@echo/utils/types/hex-string'
import { walletClient } from '@echo/web3-dom/helpers/wallet-client'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { pipe, prop } from 'ramda'
import { erc721Abi } from 'viem'
import { readContract } from 'viem/actions'

export interface GetErc721ContractApprovalArgs {
  contract: Contract
  owner: HexString
}

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, owner } = args
  const address = formatWalletAddress(contract)
  const echoAddress = getEchoAddress(contract.chain)
  const client = pipe(prop('chain'), walletClient)(contract)
  return await readContract(client, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address,
    args: [owner, echoAddress]
  })
}
