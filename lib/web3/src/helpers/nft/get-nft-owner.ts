import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemClient } from '@echo/web3/helpers/viem/get-viem-client'
import { pipe, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(nft: Nft): Promise<Wallet> {
  const {
    collection: { contract },
    tokenId
  } = nft
  const { chainId } = contract
  const client = pipe(getChainById, getViemClient)(chainId)
  const owner = await client.readContract({
    address: formatAddress(contract),
    abi: erc721Abi,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)]
  })
  return { chainId, address: toLower(owner) }
}
