import { walletFromContract } from '@echo/model/helpers/wallet/wallet-from-contract'
import type { NftWithContract } from '@echo/model/types/nft'
import type { Wallet } from '@echo/model/types/wallet'
import { getClient } from '@echo/web3/helpers/get-client'
import { backOff } from 'exponential-backoff'
import { pipe, prop, toLower } from 'ramda'
import { erc721Abi } from 'viem'

export async function getNftOwner(nft: NftWithContract): Promise<Wallet> {
  const {
    collection: { contract },
    tokenId
  } = nft
  const client = await pipe(prop('chain'), getClient)(contract)
  const owner = await backOff(
    () =>
      client.readContract({
        address: contract.address,
        abi: erc721Abi,
        functionName: 'ownerOf',
        args: [BigInt(tokenId)]
      }),
    { startingDelay: 1100 }
  )
  return walletFromContract({ address: toLower(owner), chain: contract.chain })
}
