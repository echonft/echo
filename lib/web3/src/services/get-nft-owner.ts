import type { Address } from '@echo/model/types/address'
import type { NftWithContract } from '@echo/model/types/nft'
import { getClient } from '@echo/web3/helpers/get-client'
import { backOff } from 'exponential-backoff'
import { toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(nft: NftWithContract): Promise<Address> {
  const {
    collection: { contract },
    tokenId
  } = nft
  const client = getClient()
  const owner = await backOff(
    () =>
      client.readContract({
        address: contract,
        abi: erc721Abi,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)]
      }),
    { startingDelay: 1100 }
  )
  return toLower(owner)
}
