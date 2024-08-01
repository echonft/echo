import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getClientForChain } from '@echo/web3/helpers/chain/get-client-for-chain'
import { formatWalletAddress } from '@echo/web3/helpers/format-wallet-address'
import { pipe, prop, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(
  nft: Record<'tokenId', number> & Record<'collection', Pick<Collection, 'contract'>>
): Promise<Wallet | undefined> {
  const {
    collection: { contract },
    tokenId
  } = nft
  const client = await pipe(prop('chain'), getClientForChain)(contract)
  try {
    const owner = await client.readContract({
      address: formatWalletAddress(contract),
      abi: erc721Abi,
      functionName: 'ownerOf',
      args: [BigInt(tokenId)]
    })
    return { chain: contract.chain, address: toLower(owner) }
  } catch (_err) {
    return undefined
  }
}
