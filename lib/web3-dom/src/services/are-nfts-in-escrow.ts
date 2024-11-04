import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { all, always, applySpec, equals, isNil, map, path, pipe, prop, reject, toLower } from 'ramda'
import { type ContractFunctionParameters, erc721Abi } from 'viem'
import { multicall } from 'wagmi/actions'

export async function areNftsInEscrow(nfts: Nft[]): Promise<boolean> {
  const contractCalls = map(
    applySpec<ContractFunctionParameters>({
      address: path(['collection', 'contract']),
      abi: always(erc721Abi),
      functionName: always('ownerOf'),
      args: [prop('tokenId')]
    }),
    nfts
  )
  const results = await multicall(wagmiConfig, {
    contracts: contractCalls
  })

  return pipe<[Record<'result', Nullable<string>>[]], Nullable<string>[], string[], Lowercase<string>[], boolean>(
    map(prop('result')),
    reject(isNil),
    map<string, Lowercase<string>>(toLower),
    all(equals(echoAddress))
  )(results as Record<'result', Nullable<string>>[])
}
