import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { mapNftsToIsOwnerContractCalls } from '@echo/web3-dom/mappers/map-nfts-to-is-owner-contract-calls'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { getViemChainById } from '@echo/web3/helpers/get-viem-chain-by-id'
import { all, any, equals, F, head, ifElse, isNil, map, path, pipe, prop, toLower } from 'ramda'
import { multicall } from 'viem/actions'

export interface AreNftsInEscrowArgs {
  nfts: Nft[]
}

export async function areNftsInEscrow(args: AreNftsInEscrowArgs): Promise<boolean> {
  const { nfts } = args
  const chain = pipe<[Nft[]], Nft, ChainName>(head, nonNullableReturn(path(['collection', 'contract', 'chain'])))(nfts)
  const echoAddress = getEchoAddress(chain)
  const chainId = getChainId(chain)
  const contractCalls = mapNftsToIsOwnerContractCalls(nfts)
  const client = pipe(getViemChainById, getWalletClient)(chainId)
  const results = await multicall(client, {
    contracts: contractCalls
  })
  // FIXME
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return pipe(map(prop('result')), map(toLower), ifElse(any(isNil), F, all(equals(echoAddress))))(results)
}
