import type { HexString } from '@echo/utils/types/hex-string'
import { erc721ABI } from '@wagmi/core'
import type { PublicClient } from 'viem'

export async function isOwnerOfErc721Token(
  client: PublicClient,
  contractAddress: HexString,
  owner: HexString,
  id: number
) {
  const realOwner = await client.readContract({
    address: contractAddress,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    abi: erc721ABI,
    functionName: 'ownerOf',
    args: [BigInt(id)]
  })
  return owner === realOwner
}
