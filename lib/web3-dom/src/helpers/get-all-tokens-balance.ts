import type { EvmAddress } from '@echo/model/types/evm-address'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import type { ERC20Token } from '@echo/web3-dom/types/erc20-token'
import { getViemChainById } from '@echo/web3/helpers/chain/get-viem-chain-by-id'
import { andThen, map, mapObjIndexed, path, pipe } from 'ramda'
import { erc20Abi, formatUnits } from 'viem'
import { readContract } from 'viem/actions'

interface UseTokensBalanceArgs {
  chain: ChainName
  account: EvmAddress
  tokens: ERC20Token[]
}

export async function getAllTokensBalance(args: UseTokensBalanceArgs): string[] {
  const { chain, account, tokens } = args
  const chainId = getChainId(chain)
  const client = pipe(getViemChainById, getWalletClient)(chainId)

  const mapContractResult = (result: bigint, index: string): string =>
    formatUnits(result, nonNullableReturn(path(['decimals', Number(index)]))(tokens))

  // FIXME typing
  return await pipe(
    map((token: ERC20Token) =>
      readContract(client, {
        abi: erc20Abi,
        functionName: 'balanceOf',
        address: token.contract,
        args: [account]
      })
    ),
    promiseAll,
    andThen(mapObjIndexed(mapContractResult))
  )(tokens)
}
