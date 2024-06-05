import type { Nft } from '@echo/model/types/nft'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { getChainId } from '@echo/utils/helpers/chains/get-chain-id'
import type { ChainName } from '@echo/utils/types/chain-name'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getEchoAddressByChain } from '@echo/web3/helpers/get-echo-address-by-chain'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { mapNftsToIsOwnerContractCalls } from '@echo/web3-dom/mappers/map-nfts-to-is-owner-contract-calls'
import { all, any, equals, F, head, ifElse, isNil, map, path, pipe, prop } from 'ramda'
import { multicall } from 'viem/actions'

interface AreNftsInEscrowArgs {
  nfts: Nft[]
}

export async function areNftsInEscrow(args: AreNftsInEscrowArgs): Promise<boolean> {
  const { nfts } = args
  const chain = pipe<[Nft[]], Nft, ChainName>(head, nonNullableReturn(path(['collection', 'contract', 'chain'])))(nfts)
  const echoAddress = getEchoAddressByChain(chain)
  const chainId = getChainId(chain)
  const contractCalls = mapNftsToIsOwnerContractCalls(nfts)
  const client = pipe(getChainById, getWalletClient)(chainId)
  const results = await multicall(client, {
    contracts: contractCalls
  })
  // FIXME
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return pipe(map(prop('result')), ifElse(any(isNil), F, all(equals(echoAddress))))(results)
}
