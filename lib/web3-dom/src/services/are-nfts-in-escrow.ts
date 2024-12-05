import type { Nft } from '@echo/model/types/nft'
import { wagmiConfig } from '@echo/web3-dom/constants/wagmi-config'
import { echoAddress } from '@echo/web3/constants/echo-address'
import { head, isNil, path, pipe, toLower } from 'ramda'
import { erc721Abi } from 'viem'
import { readContract } from 'wagmi/actions'

export async function areNftsInEscrow(nfts: Nft[]): Promise<boolean> {
  const firstNft = head(nfts)
  if (isNil(firstNft)) {
    return false
  }

  try {
    const owner = await readContract(wagmiConfig, {
      address: path(['collection', 'contract'], firstNft),
      abi: erc721Abi,
      functionName: 'ownerOf',
      args: [BigInt(firstNft.tokenId)]
    })

    return pipe(toLower)(owner) === echoAddress
  } catch (_err) {
    return false
  }
}
