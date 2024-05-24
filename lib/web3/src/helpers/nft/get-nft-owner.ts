import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { getChainId } from '@echo/utils/helpers/get-chain-id'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getChainById } from '@echo/web3/helpers/get-chain-by-id'
import { getViemClient } from '@echo/web3/helpers/get-viem-client'
import { pipe, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(nft: Nft): Promise<Wallet> {
  const {
    collection: { contract },
    tokenId
  } = nft
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
