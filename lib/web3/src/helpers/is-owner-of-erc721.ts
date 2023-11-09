import type { Nft } from '@echo/model/types/nft'
import { erc721ABI } from '@echo/web3/constants/erc721-abi'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'
import { getAddress } from 'viem'

export async function isOwnerOfErc721(nft: Nft) {
  const {
    collection: {
      contract: { address, chainId }
    },
    id,
    tokenId,
    owner: {
      wallet: { address: ownerAddress }
    }
  } = nft
  const client = getViemClient(chainId)
  const realOwner = await client.readContract({
    address,
    abi: erc721ABI,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)]
  })
  if (getAddress(ownerAddress, chainId) !== getAddress(realOwner, chainId)) {
    throw Error(`${ownerAddress} is not the owner of nft ${id}`)
  }
}
