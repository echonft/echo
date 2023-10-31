import type { Nft } from '@echo/model/types/nft'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'
import { getAddress } from 'viem'
import { erc721ABI } from 'wagmi'

export async function isOwnerOfErc721(nft: Nft) {
  const chainId = nft.collection.contract.chainId
  const client = getViemClient(chainId)
  const realOwner = await client.readContract({
    address: nft.collection.contract.address,
    abi: erc721ABI,
    functionName: 'ownerOf',
    args: [BigInt(nft.tokenId)]
  })
  if (getAddress(nft.owner.wallet.address, chainId) !== getAddress(realOwner, chainId)) {
    throw Error(`${nft.owner.wallet.address} is not the owner of nft ${nft.id}`)
  }
}
