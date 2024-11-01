import type { Chain } from '@echo/model/constants/chain'
import type { Nft } from '@echo/model/types/nft'
import type { Nullable } from '@echo/utils/types/nullable'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAddress } from '@echo/web3/helpers/echo-address'
import { all, always, applySpec, equals, head, isNil, map, path, pipe, prop, reject, toLower } from 'ramda'
import { type ContractFunctionParameters, erc721Abi } from 'viem'
import { multicall } from 'wagmi/actions'

export interface AreNftsInEscrowArgs {
  nfts: Nft[]
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
  const results = await multicall(wagmiConfig, {
    contracts: contractCalls
  })
  const echoContractAddress = echoAddress(chain)

  return pipe<[Record<'result', Nullable<string>>[]], Nullable<string>[], string[], Lowercase<string>[], boolean>(
    map(prop('result')),
    reject(isNil),
    map<string, Lowercase<string>>(toLower),
    all(equals(echoContractAddress))
  )(results as Record<'result', Nullable<string>>[])
}
