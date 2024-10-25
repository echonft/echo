import type { Chain } from '@echo/model/constants/chain'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { getWalletClient } from '@echo/web3-dom/helpers/get-wallet-client'
import { mapNftsToIsOwnerContractCalls } from '@echo/web3-dom/mappers/map-nfts-to-is-owner-contract-calls'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { all, head, isNil, map, path, pipe, prop, toLower } from 'ramda'
import { multicall } from 'viem/actions'

export interface AreNftsInEscrowArgs {
  nfts: Nft[]
}

function isEchoAddress(chain: Chain) {
  return function (result: Nullable<string>) {
    if (isNil(result)) {
      return false
    }
    return getEchoAddress(chain) === toLower(result)
  }
}

export async function areNftsInEscrow(args: AreNftsInEscrowArgs): Promise<boolean> {
  const { nfts } = args
  const chain = pipe<[Nft[]], Nft, Chain>(head, path(['collection', 'contract', 'chain']))(nfts)
  const contractCalls = mapNftsToIsOwnerContractCalls(nfts)
  const client = getWalletClient(chain)
  const results = await multicall(client, {
    contracts: contractCalls
  })

  return pipe<[Record<'result', Nullable<string>>[]], Nullable<string>[], boolean>(
    map(prop('result')),
    all(isEchoAddress(chain))
  )(results as Record<'result', Nullable<string>>[])
}
