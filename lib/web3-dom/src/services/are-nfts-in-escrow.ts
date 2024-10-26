import type { Chain } from '@echo/model/constants/chain'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { walletClient } from '@echo/web3-dom/helpers/wallet-client'
import { getEchoAddress } from '@echo/web3/helpers/get-echo-address'
import { all, always, applySpec, head, isNil, map, path, pipe, prop, toLower } from 'ramda'
import { type ContractFunctionParameters, erc721Abi } from 'viem'
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

export async function areNftsInEscrow({ nfts }: AreNftsInEscrowArgs): Promise<boolean> {
  const chain = pipe<[Nft[]], Nft, Chain>(head, path(['collection', 'contract', 'chain']))(nfts)
  const contractCalls = map(
    applySpec<ContractFunctionParameters>({
      address: path(['collection', 'contract', 'address']),
      abi: always(erc721Abi),
      functionName: always('ownerOf'),
      args: [prop('tokenId')]
    }),
    nfts
  )
  const client = walletClient(chain)
  const results = await multicall(client, {
    contracts: contractCalls
  })

  return pipe<[Record<'result', Nullable<string>>[]], Nullable<string>[], boolean>(
    map(prop('result')),
    all(isEchoAddress(chain))
  )(results as Record<'result', Nullable<string>>[])
}
