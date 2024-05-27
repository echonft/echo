import type { Nft } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { formatAddress } from '@echo/web3/helpers/format-address'
import { getClientForChain } from '@echo/web3/helpers/get-client-for-chain'
import { pipe, prop, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(nft: Nft): Promise<Wallet> {
  const {
    collection: { contract },
    tokenId
  } = nft
  const client = pipe(prop('chain'), getClientForChain)(contract)
  const owner = await client.readContract({
    address: formatAddress(contract),
    abi: erc721Abi,
    functionName: 'ownerOf',
    args: [BigInt(tokenId)]
  })
  return { chain: contract.chain, address: toLower(owner) }
}
