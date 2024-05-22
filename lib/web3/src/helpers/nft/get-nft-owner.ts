import type { Contract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'
import { head, pipe, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(nft: Nft): Promise<Wallet> {
  const {
    collection: { contracts },
    tokenId
  } = nft
  // FIXME Contract[] Not sure if thats the proper behaviour
  const contract = nonNullableReturn<[Contract[]], Contract>(head)(contracts)
  const chainId = getChainId(contract.chain)
  const client = pipe(getChainById, getViemClient)(chainId)
  const owner = await client.readContract({
    address: formatAddress(contract),
    abi: erc721Abi,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)]
  })
  return { chain: contract.chain, address: toLower(owner) }
}
