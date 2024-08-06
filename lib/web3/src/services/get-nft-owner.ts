import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { formatWalletAddress } from '@echo/web3/utils/format-wallet-address'
import { backOff } from 'exponential-backoff'
import { pipe, prop, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(
  nft: Record<'tokenId', number> & Record<'collection', Pick<Collection, 'contract'>>
): Promise<Wallet> {
  const {
    collection: { contract },
    tokenId
  } = nft
  const client = await pipe(prop('chain'), getClientForChain)(contract)
  const owner = await backOff(
    () =>
      client.readContract({
        address: formatWalletAddress(contract),
        abi: erc721Abi,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)]
      }),
    { startingDelay: 1100 }
  )
  return { chain: contract.chain, address: toLower(owner) }
}
