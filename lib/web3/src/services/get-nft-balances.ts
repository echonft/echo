import type { Address } from '@echo/model/types/address'
import { getClient } from '@echo/web3/helpers/get-client'
import { erc721Abi } from 'viem'
import { multicall } from 'viem/actions'

interface GetNftBalancesArgs {
  contracts: Address[]
  wallet: Address
}

export async function getNftBalances({ wallet, contracts }: GetNftBalancesArgs): Promise<number> {
  const client = getClient()
  try {
    const calls = contracts.map((contract) => ({
      address: contract,
      abi: erc721Abi,
      functionName: 'balanceOf',
      args: [wallet]
    }))

    const balances = await multicall(client, {
      contracts: calls
    })

    return balances.reduce((total, result) => {
      if (result.status === 'success') {
        return total + Number(result.result)
      }
      return total
    }, 0)
  } catch (_err) {
    return 0
  }
}
