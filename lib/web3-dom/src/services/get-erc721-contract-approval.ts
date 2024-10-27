import type { EvmAddress } from '@echo/model/types/address'
import type { Contract } from '@echo/model/types/contract'
import { walletClient } from '@echo/web3-dom/helpers/wallet-client'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { pipe, prop } from 'ramda'
import { erc721Abi } from 'viem'
import { readContract } from 'viem/actions'

export interface GetErc721ContractApprovalArgs {
  contract: Contract
  address: EvmAddress
}

export async function getErc721ContractApproval(args: GetErc721ContractApprovalArgs) {
  const { contract, address } = args
  const client = pipe(prop('chain'), walletClient)(contract)
  return await readContract(client, {
    abi: erc721Abi,
    functionName: 'isApprovedForAll',
    address: contract.address,
    args: [address, echoAddress(contract.chain)]
  })
}
