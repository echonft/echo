import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { propIsNotNil } from '@echo/utils/fp/prop-is-not-nil'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { echoAddressByChain } from '@echo/web3/constants/echo-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { mapNftsToIsOwnerContractCalls } from '@echo/web3-dom/mappers/map-nfts-to-is-owner-contract-calls'
import { all, always, any, head, ifElse, map, path, pipe, prop, T } from 'ramda'
import { multicall } from 'viem/actions'
import type { MulticallReturnType } from 'viem/actions/public/multicall'

interface AreNftsInEscrowArgs {
  nfts: Nft[]
}

export async function areNftsInEscrow(args: AreNftsInEscrowArgs): Promise<boolean> {
  const { nfts } = args
  const chain = pipe<[Nft[]], Nft, ChainName>(head, nonNullableReturn(path(['collection', 'contract', 'chain'])))(nfts)
  const echoAddress = echoAddressByChain(chain)
  const chainId = getChainId(chain)
  const contractCalls = mapNftsToIsOwnerContractCalls({ nfts, owner: echoAddress })
  const client = pipe(getChainById, getWalletClient)(chainId)
  const results = await multicall(client, {
    contracts: contractCalls
  })
  return ifElse<MulticallReturnType[], boolean, boolean>(
    any(propIsNotNil('error')),
    always(false),
    pipe(map(prop('result')), all(T))
  )(results)
}
